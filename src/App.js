import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Accordion, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import FormInput from "./components/CompanyInputs";
import TimeAndDateComponent from "./components/TimeAndDateComponent";
import EmailModal from "./components/EmailModal";
import { Form } from "react-bootstrap";
import DropdownMenuForFormats from "./components/DropdownComp";
import Avvvatars from "avvvatars-react";

import { DialogExample } from "./components/GoogleLoginModal";
import { DrawerExample } from "./components/SideDrawer";

import { customToast } from "./components/CustomToast";
import { googleLogout } from "@react-oauth/google";

import ProfileCard from "./components/ProfileCard";
import { set } from "mongoose";

/**
 * The main component of the email scheduler application.
 *
 * @returns {JSX.Element} The JSX element representing the App component.
 */
function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johnDoe@xyz.com",
    picture: "https://via.placeholder.com/150",
  });
  const [emails, setEmails] = useState("");
  const [format, setFormat] = useState("format1");
  const [formatData, setFormatData] = useState("");
  const [subject, setSubject] = useState(
    "Application for Developer position at"
  );
  const [companyName, setCompanyName] = useState("");
  const [companyPost, setCompanyPost] = useState("");
  const [companyPostURL, setCompanyPostURL] = useState("");

  // Drive URL of the users resume and CV
  const [resumeUrl, setResumeUrl] = useState("");
  const [cvUrl, setCVUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const [scheduleTime, setScheduleTime] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const [barWidth, setBarWidth] = useState("25vw"); // Initial width of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track if sidebar is collapsed
  const [authCode, setAuthCode] = useState(null);
  const [sendImmediately, setSendImmediately] = useState(false); // Check if the sendImmediately checkbox is checked

  const [button, setButton] = useState(false);

  const [isCustomFormat, setIsCustomFormat] = useState(false);

  // Access the API from env file
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchScheduledEmails();
    }
  }, [user]);

  const toggleBar = () => {
    if (isCollapsed) {
      setBarWidth("25vw"); // Expand the sidebar width
    } else {
      setBarWidth("7vw"); // Collapse the sidebar width
    }
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (
      user &&
      user.access_token &&
      user.access_token !== null &&
      user.access_token !== undefined
    ) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          localStorage.removeItem("user");
          toast.error("Please login again to continue.");
        });
    } else {
      if (button) {
        button.click();
      }
    }
  }, [user, button]);

  const useToggleState = (initial = false) => {
    const [state, setState] = React.useState(initial);

    const close = () => {
      setState(false);
    };

    const open = () => {
      console.log("open");
      setState(true);
    };

    const toggleDrawer = () => {
      setState((state) => !state);
    };

    const hookData = [state, open, close, toggleDrawer];

    hookData.state = state;
    hookData.openDrawer = open;
    hookData.closeDrawer = close;
    hookData.toggleDrawer = toggleDrawer;
    return hookData;
  };

  const [stateDrawer, openDrawer, closeDrawer, toggleDrawer] = useToggleState();

  // Functions

  const handleUpdateClick = (index) => {
    setSelectedEmail({ ...scheduledEmails[index], index });
  };

  const deleteScheduledEmail = async (index) => {
    try {
      const response = await axios.delete(
        `${api}/delete-scheduled-email/${user.id}/${index}`
      );
      if (response.status === 200) {
        toast.success(`Scheduled email has been deleted!`);
        fetchScheduledEmails();
      } else {
        toast.error("Failed to delete the scheduled email.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to delete the scheduled email."
      );
    }
  };

  const handleSubmitImmediately = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("user")).access_token);
    const toastId = customToast("Sending...");
    try {
      await axios.post(api + "/send-email", {
        userName: profile.name,
        userEmail: profile.email,
        emails,
        format,
        subject,
        companyName,
        companyPost,
        companyPostURL,
        resumeUrl,
        cvUrl,
        accessToken: JSON.parse(localStorage.getItem("user")).access_token,
      });
      toast.success("Mail sent successfully");
    } catch (error) {
      toast.dismiss(toastId.id);
      toast.error("Error sending email. ");
      console.error("Failed to send mail", error);
    } finally {
      toast.dismiss(toastId.id);
      setLoading(false);
    }
  };

  const handleSubmitImmediatelyCustom = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("user")).access_token);
    const toastId = customToast("Sending...");
    try {

      await axios.post(api + "/send-custom-email", {
        emails,
        subject,
        customFormat : formatData,
        accessToken: JSON.parse(localStorage.getItem("user")).access_token,
      });
      toast.success("Mail sent successfully");
    } catch (error) {
      toast.dismiss(toastId.id);
      toast.error("Error sending email. ");
      console.error("Failed to send mail", error);
    } finally {
      toast.dismiss(toastId.id);
      setLoading(false);
    }
  };

  const handleSubmitScheduled = async (e, newScheduleTime) => {
    e.preventDefault();
    const toastId = customToast("Sending...");
    try {
      await axios.post(api + "/schedule-email", {
        emails,
        format,
        subject,
        companyName,
        companyPost,
        companyPostURL,
        resumeUrl,
        cvUrl,
        scheduleTime: newScheduleTime,
        userEmail: profile.email,
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
      });
      await fetchScheduledEmails(); // Wait for fetching scheduled emails to complete
    } catch (error) {
      toast.dismiss(toastId.id);
      toast.error("Error scheduling email. ");
      console.error("Failed to schedule mail", error);
    } finally {
      toast.dismiss(toastId.id);
      setLoading(false);
    }
    toast.success("Mail scheduled successfully");
  };

  const handleSubmitScheduledCustom = async (e, newScheduleTime) => {
    e.preventDefault();
    const toastId = customToast("Sending...");
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post(api + "/schedule-custom-email", {
        userId: profile.id,
        emails,
        subject,
        scheduleTime: newScheduleTime,
        formatData,
        accessToken: user.access_token,
      });
      await fetchScheduledEmails(); // Wait for fetching scheduled emails to complete
    } catch (error) {
      toast.dismiss(toastId.id);
      toast.error("Error scheduling email. ");
      console.error("Failed to schedule mail", error);
    } finally {
      toast.dismiss(toastId.id);
      setLoading(false);
    }
    toast.success("Mail scheduled successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      if (!user) {
        toast.error("Please login to continue.");
        return;
      }

      if (!emails) {
        toast.error("Please enter the email address.");
        return;
      }

      if (!subject) {
        toast.error("Please enter the subject.");
        return;
      }

      if (isCustomFormat && sendImmediately) {
        await handleSubmitImmediatelyCustom(e);
        return;
      }

      if (sendImmediately) {
        return handleSubmitImmediately(e);
      }

      const newScheduleTime = `${time.split(":")[1]} ${time.split(":")[0]} ${
        date.split("-")[2]
      } ${date.split("-")[1]} *`;
      setScheduleTime(newScheduleTime);

      if (!newScheduleTime) {
        toast.error("Please select a date and time to schedule the email.");
        return;
      }

      if (isCustomFormat) {
        await handleSubmitScheduledCustom(e, newScheduleTime);
        return;
      }
      await handleSubmitScheduled(e, newScheduleTime);
    } catch (error) {
      toast.error("Error scheduling email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledEmails = async () => {
    try {
      const response = await axios.get(`${api}/scheduled-emails/${profile.id}`);
      console.log("Scheduled emails:", response.data);
      setScheduledEmails(response.data);
    } catch (error) {
      console.error("Error fetching scheduled emails:", error);
    }
  };

  const getFormat = async () => {
    try {
      const response = await axios.get(`${api}/email-formats/${format}`);
      const data = await response.data.content;
      setFormatData(data);
      return data;
    } catch (error) {
      console.error("Error fetching format:", error);
    }
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <DialogExample
        setAuthCode={setAuthCode}
        setUser={setUser}
        api={api}
        setButton={setButton}
        setProfile={setProfile}
      />
      <DrawerExample
        isOpen={stateDrawer}
        onClose={closeDrawer}
        onOpen={openDrawer}
        api={api}
      />

      <Toaster />
      <EmailModal
        show={show}
        handleClose={handleClose}
        selectedEmail={selectedEmail}
        handleUpdateSubmit={handleSubmit}
      />
      <section className="profile">
        <ProfileCard profile={profile} logOut={logOut} button={button} />
        <div className=" !m-0   h-[75px] w-full">
          <Button
            onClick={openDrawer}
            className="h-full w-full mt-2 !bg-neutral-500/40 hover:!bg-neutral-400/80 !flex !justify-around !items-center"
          >
            <img
              src="https://i0.wp.com/businesspost.ng/wp-content/uploads/2023/12/Google-Gemini-AI-Model-2.png?fit=2699%2C2495&ssl=1"
              alt="Google Gemini"
              className="h-2/3 w-1/4"
            />
            <p className="text-center text-lg  relative border-l-2 pt-0 pl-1 w-1/2 self-end">
              Try Gemini
            </p>
          </Button>
        </div>
      </section>
      <section className="container">
        <header className="App-header">
          <h1>Email Scheduler</h1>
        </header>

        <form className="form form-group" onSubmit={handleSubmit}>
          <Form.Group controlId="customFormat">
            <Form.Check
              type="checkbox"
              label="Custom Format"
              checked={isCustomFormat}
              onChange={(e) => setIsCustomFormat(e.target.checked)}
            />
          </Form.Group>
          <FormInput
            value={emails}
            onChangeFunc={setEmails}
            className="form-control"
            label={"Emails (comma-separated):"}
            placeholder={"e.g. abc@google.com, xyz@microsoft.com"}
          />
          {!isCustomFormat && (
            <DropdownMenuForFormats
              format={format}
              handleFormatChange={handleFormatChange}
            />
          )}
          <div className="input-box">
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          {!isCustomFormat ? (
            <>
              {["format1", "format3"].includes(format) && (
                <>
                  <FormInput
                    value={companyName}
                    onChangeFunc={setCompanyName}
                    className="form-control"
                    label={"Company Name:"}
                  />
                  <FormInput
                    value={companyPost}
                    onChangeFunc={setCompanyPost}
                    className="form-control"
                    label={"Company Post:"}
                  />
                  <FormInput
                    value={companyPostURL}
                    onChangeFunc={setCompanyPostURL}
                    className="form-control"
                    label={"Company Post URL:"}
                  />
                </>
              )}
              <FormInput
                value={resumeUrl}
                onChangeFunc={setResumeUrl}
                className="form-control"
                label={"Resume URL:"}
              />
              <FormInput
                value={cvUrl}
                onChangeFunc={setCVUrl}
                className="form-control"
                label={"CV URL:"}
              />
            </>
          ) : (
            <>
              <div className="input-box h-[225px]">
                <label>Format:</label>
                <textarea
                  value={formatData}
                  onChange={(e) => setFormatData(e.target.value)}
                  className="form-control "
                  style={{
                    height: "200px",
                    fontSize: "14px",
                  }}
                  placeholder="Enter the format or Try Gemini"
                />
              </div>
            </>
          )}

          <Form.Group controlId="sendImmediately" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Send Immediately"
              checked={sendImmediately}
              onChange={(e) => setSendImmediately(e.target.checked)}
            />
          </Form.Group>

          <>
            {!sendImmediately && (
              <TimeAndDateComponent
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />
            )}
          </>

          <Button type="submit" variant="success" className="mt-3">
            Schedule
          </Button>
        </form>
      </section>
      <section className="App-aside" style={{ width: barWidth }}>
        <div className="toggle-btn" onClick={toggleBar}>
          <FontAwesomeIcon
            icon={
              isCollapsed
                ? faUpRightAndDownLeftFromCenter
                : faDownLeftAndUpRightToCenter
            }
          />
        </div>
        {
          // Display the scheduled emails only the bar is not collapsed
          !isCollapsed && (
            <div className="email-item">
              <div className="profile-details">
                <Avvvatars value={profile?.name || "John Doe"} />
                <h3 className="text-capitalize">
                  {profile?.name || "John Doe"}
                </h3>
                <p>{profile?.email || "john.doe@example.com"}</p>
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Scheduled Emails</Accordion.Header>
                  <Accordion.Body>
                    {scheduledEmails.map((email, index) => (
                      <div key={index} className="email-item">
                        <p>{email.subject}</p>
                        <p>{email.scheduleTime}</p>
                        <Button
                          variant="warning"
                          onClick={() => handleUpdateClick(index)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteScheduledEmail(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          )
        }
      </section>
    </div>
  );
}

export default App;
