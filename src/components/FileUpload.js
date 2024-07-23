import axios from "axios";
import { useState } from "react";

const UploadFile = ({}) => {
    const [resumeUrl, setResumeUrl] = useState("");
    const [cvUrl, setCVUrl] = useState("");

    const handleResumeChange = (e) => {
        setResumeUrl(e.target.value);
    };

    const handleCVChange = (e) => {
        setCVUrl(e.target.value);
    };

    const handleUpload = async () => {
        // You can use the resumeUrl and cvUrl variables to perform any necessary actions with the URLs
        console.log("Resume URL:", resumeUrl);
        console.log("CV URL:", cvUrl);
    };

    return (
        <div>
            <input type="text" placeholder="Resume URL" onChange={handleResumeChange} />
            <input type="text" placeholder="CV URL" onChange={handleCVChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadFile;
