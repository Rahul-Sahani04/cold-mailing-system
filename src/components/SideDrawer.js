import React from "react";
import { Button } from "../raw_components/CustomButtons";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../raw_components/SideDrawerComponents";

import { customToast } from "./CustomToast";
import toast from "react-hot-toast";

import axios from "axios";

export const DrawerExample = ({ api, isOpen, onClose, onOpen }) => {

  const [formattedEmailData, setFormattedEmailData] = React.useState("")
  const [emailData, setEmailData] = React.useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    userCertification: "",
    userSkills: "",
    jobProfile: "",
    companyName: "",
    companyPost: "",
    companyPostURL: "",
    socialLinks: "",
    projects: "",
    message: "",
    format: "format1",
    resumeUrl: "",
    cvUrl: "",
  });

  const emailContents = {
    format1: (
      userName,
      userEducation,
      userCertification,
      jobProfile,
      userSkills,
      companyName,
      companyPost,
      companyPostURL,
      userGithub,
      userPortfolio1,
      userPortfolio2,
      userPortfolio3,
      userPhone
    ) => ({
      text: "",
      html: `Respected Hiring Manager,<br/><br/>
      My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
      I am very interested in ${
        jobProfile || ""
      } and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
      I assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at ${companyName} for the role of <a href="${companyPostURL}">${companyPost}</a>, and would appreciate it if you could kindly view my application.<br/><br/>
      These are some of my work samples for your reference:<br/>
      <a href="${userGithub}">${userName} Github</a><br/>
      <a href="${userPortfolio1}">Project 1</a><br/>
      <a href="${userPortfolio2}">Project 2</a><br/>
      <a href="${userPortfolio3}">Project 3</a><br/><br/>
      PFA<br/>
      1) Cover Letter<br/>
      2) CV<br/><br/>
      Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>
      --<br/>
      Regards,<br/>
      ${userName}<br/>
      ${userPhone}`,
    }),

    format2: (
      userName,
      userEducation,
      userCertification,
      jobProfile,
      userSkills,
      userGithub,
      userPortfolio1,
      userPortfolio2,
      userPortfolio3,
      userPhone
    ) => ({
      text: "",
      html: `Respected Hiring Manager,<br/><br/>
      My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
      I am very interested in ${jobProfile} and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
      I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>
      These are some of my work samples for your reference:<br/>
      <a href="${userGithub}">${userName} Github</a><br/>
      <a href="${userPortfolio1}">Project 1</a><br/>
      <a href="${userPortfolio2}">Project 2</a><br/>
      <a href="${userPortfolio3}">Project 3</a><br/><br/>
      PFA<br/>
      1) CV<br/>
      2) Cover Letter<br/><br/>
      Thank you for your time and consideration. Kindly contact me if any opportunity comes up.<br/><br/>
      --<br/>
      Regards,<br/>
      ${userName}<br/>
      ${userPhone}`,
    }),

    format3: (
      userName,
      userEducation,
      userCertification,
      userSkills,
      jobProfile,
      companyName,
      companyPost,
      companyPostURL,
      userGithub,
      userPortfolio1,
      userPortfolio2,
      userPortfolio3,
      userPhone
    ) => ({
      text: "",
      html: `Respected Hiring Manager,<br/><br/>
      My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
      I am very interested in ${
        jobProfile || ""
      } and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
      I assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of <a href="${companyPostURL}">${companyPost}</a> at ${companyName} and would greatly appreciate it if you could review my profile and consider me for this role.<br/><br/>
      These are some of my work samples for your reference:<br/>
      <a href="${userGithub}">${userName} Github</a><br/>
      <a href="${userPortfolio1}">Project 1</a><br/>
      <a href="${userPortfolio2}">Project 2</a><br/>
      <a href="${userPortfolio3}">Project 3</a><br/><br/>
      PFA<br/>
      1) Cover Letter<br/>
      2) CV<br/><br/>
      Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>
      --<br/>
      Regards,<br/>
      ${userName}<br/>
      ${userPhone}`,
    }),
  };

  const [emailContent, setEmailContent] = React.useState("");
  // Get reponse from gemini api
  const generateEmail = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to generate email content!");
      return;
    }
    
    try {
      console.log("Email Data: ", emailData);
      const loadingTOast = customToast("Generating email content...", "info");
      const response = await axios.post(api + "/generate-email-content", {
        ...emailData,
      });

      console.log("Response from server: ", response.data);
      const { content } = response.data;
      setEmailContent(content.html);

      console.log("Response from server: ", response);

      if (response.data.success) {
        toast.success("Email content generated successfully!");
      }
      toast.dismiss(loadingTOast.id);
    } catch (error) {
      console.error("Error generating email: ", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="sm:max-w-lg ">
        <DrawerHeader>
          <DrawerTitle>Gemini Chat App</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            Ask Gemini to generate mail content for you.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {/* Input fields for all of this      userName,
      userEducation,
      userCertification,
      userSkills,
      companyName,
      companyPost,
      companyPostURL,
      userGithub,
      userPortfolio1,
      userPortfolio2,
      userPortfolio3,
      userPhone */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={emailData.name}
                onChange={(e) =>
                  setEmailData({ ...emailData, name: e.target.value })
                }
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4 "
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="abc@xyz.com"
                value={emailData.email}
                onChange={(e) =>
                  setEmailData({ ...emailData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="phone" className="text-sm">
                Phone
              </label>
              <input
                id="phone"
                type="number"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="9512XXXXXX"
                value={emailData.phone}
                onChange={(e) =>
                  setEmailData({ ...emailData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="education" className="text-sm">
                Education
              </label>
              <input
                id="education"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="12th, Degree"
                value={emailData.education}
                onChange={(e) =>
                  setEmailData({ ...emailData, education: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="userCertification" className="text-sm">
                Certification (if any)
              </label>
              <input
                id="userCertification"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Advanced AWS"
                value={emailData.userCertification}
                onChange={(e) =>
                  setEmailData({
                    ...emailData,
                    userCertification: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="userSkills" className="text-sm">
                Skills
              </label>
              <input
                id="userSkills"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Java, Node JS, React"
                value={emailData.userSkills}
                onChange={(e) =>
                  setEmailData({ ...emailData, userSkills: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="jobProfile" className="text-sm">
                Job Profile
              </label>
              <input
                id="jobProfile"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Software Developer"
                value={emailData.jobProfile}
                onChange={(e) =>
                  setEmailData({ ...emailData, jobProfile: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="companyName" className="text-sm">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Google"
                value={emailData.companyName}
                onChange={(e) =>
                  setEmailData({ ...emailData, companyName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="companyPost" className="text-sm">
                Company Post
              </label>
              <input
                id="companyPost"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="careers.google.com"
                value={emailData.companyPost}
                onChange={(e) =>
                  setEmailData({ ...emailData, companyPost: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="companyPostURL" className="text-sm">
                Company Post URL
              </label>
              <input
                id="companyPostURL"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder=""
                value={emailData.companyPostURL}
                onChange={(e) =>
                  setEmailData({ ...emailData, companyPostURL: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="userGithub" className="text-sm">
                Social Links
              </label>
              <input
                id="socials"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Social Links (like: linkedin, github)"
                value={emailData.socialLinks}
                onChange={(e) =>
                  setEmailData({ ...emailData, socialLinks: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="projects" className="text-sm">
                Projects
              </label>
              <input
                id="projects"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Project 1: Url, Project 2: Url, Project 3: Url"
                value={emailData.projects}
                onChange={(e) =>
                  setEmailData({ ...emailData, projects: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="resumeUrl" className="text-sm">
                Resume URL
              </label>
              <input
                id="resumeUrl"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Resume URL"
                value={emailData.resumeUrl}
                onChange={(e) =>
                  setEmailData({ ...emailData, resumeUrl: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="cvUrl" className="text-sm">
                CV URL
              </label>
              <input
                id="cvUrl"
                type="text"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="CV URL"
                value={emailData.cvUrl}
                onChange={(e) =>
                  setEmailData({ ...emailData, cvUrl: e.target.value })
                }
              />
            </div>

            {/* Dropdown for Format Selection with preview */}

            <div className="flex flex-col space-y-1">
              <label htmlFor="format" className="text-sm">
                Format
              </label>
              <select
                id="format"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                value={emailData.format}
                onChange={(e) =>
                  setEmailData({ ...emailData, format: e.target.value })
                }
              >
                <option value="format1">Format 1</option>
                <option value="format2">Format 2</option>
                <option value="format3">Format 3</option>
              </select>
            </div>

            {/* A preview of the sample email formats that change based on the selected format */}

            <div className="flex flex-col space-y-1">
              <label className="text-sm">Preview</label>
              <div
                className="border border-gray-200 rounded-md p-2 text-xs"
                dangerouslySetInnerHTML={{
                  __html: emailContents[emailData.format](
                    "John Doe",
                    "B.Tech",
                    "AWS Certified",
                    "Software Developer",
                    "Node JS, React",
                    "Google",
                    "Software Developer",
                    "careers.google.com",
                    "linkedin.com/johndoe",
                    "project1.com",
                    "project2.com",
                    "project3.com",
                    "9512XXXXXX"
                  ).html,
                }}
              ></div>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                className="input border border-gray-200 rounded-md p-1 placeholder:pl-4"
                placeholder="Need to make any extra changes?"
                value={emailData.message}
                onChange={(e) =>
                  setEmailData({ ...emailData, message: e.target.value })
                }
              />
            </div>
          </div>
        </DrawerBody>

        {/* Output the response from the server */}
        <DrawerFooter>
          <Button className="w-full" onClick={generateEmail}>
            Generate Email
          </Button>
        </DrawerFooter>

        {emailContent && (
          <DrawerFooter>
            <div className="flex flex-col space-y-1">
              <label className="text-sm">Response</label>
              <p className="text-xs"> AI generated email may not be perfect. Please review before sending.</p>
              <div className="border border-gray-200 rounded-md p-2 text-xs relative">

              <Button className="w-full m-0 absolute bottom-0 right-0" onClick={() => copyToClipboard(formattedEmailData)} >
                Copy to Clipboard
              </Button>
                <div dangerouslySetInnerHTML={{ __html: emailContent }} className="mb-4" onChange={(e) => setFormattedEmailData(e.target.value)}></div>
              </div>
            </div>
          </DrawerFooter>
        )}
        <DrawerFooter className="mt-6">
          <DrawerClose asChild>
            <Button
              className="!m-0 w-full sm:mt-0 sm:w-fit"
              variant="secondary"
            >
              Go back
            </Button>
          </DrawerClose>
          <Button className="w-full sm:w-fit" onClick={onClose}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerExample;
