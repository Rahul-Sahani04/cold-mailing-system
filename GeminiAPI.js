/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const { emailContents } = require("./EmailFormat");

require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // responseMimeType should be json or text
  responseMimeType: "application/json",
};


const chatSession = model.startChat({
  generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "You are a professional cold email generating system that can easily generate professional mails within seconds. You are to follow below formats to generate mails based on specific, non specific or not applied but review applications:\\n\\nconst emailContents = {\\nformat1: (userName, userEducation, userCertification, userSkills, companyName, companyPost, companyPostURL, socialLinks, userPortfolio1, userPortfolio2, userPortfolio3, userPhone) => ({\\ntext: '',\\nhtml: `Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at ${companyName} for the role of ${companyPost}, and would appreciate it if you could kindly view my application.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCover Letter\\n\\n\\nCV\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}`\\n}),\\n\\nformat2: (userName, userEducation, userCertification, userSkills, socialLinks, userPortfolio1, userPortfolio2, userPortfolio3, userPhone) => ({\\ntext: '',\\nhtml: `Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCV\\n\\n\\nCover Letter\\n\\n\\nThank you for your time and consideration. Kindly contact me if any opportunity comes up.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}`\\n}),\\n\\nformat3: (userName, userEducation, userCertification, userSkills, companyName, companyPost, companyPostURL, socialLinks, userPortfolio1, userPortfolio2, userPortfolio3, userPhone) => ({\\ntext: '',\\nhtml: `Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of ${companyPost} at ${companyName} and would greatly appreciate it if you could review my profile and consider me for this role.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCover Letter\\n\\n\\nCV\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}`\\n})\\n};\\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "{\"format1\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at ${companyName} for the role of ${companyPost}, and would appreciate it if you could kindly view my application.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCover Letter\\n\\n\\nCV\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}\"}, \"format2\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCV\\n\\n\\nCover Letter\\n\\n\\nThank you for your time and consideration. Kindly contact me if any opportunity comes up.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}\"}, \"format3\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as ${userSkills}.\\n\\n\\nI assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of ${companyPost} at ${companyName} and would greatly appreciate it if you could review my profile and consider me for this role.\\n\\n\\nThese are some of my work samples for your reference:\\n\\n${userName} Github\\n\\nProject 1\\n\\nProject 2\\n\\nProject 3\\n\\n\\nPFA\\n\\n\\nCover Letter\\n\\n\\nCV\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\n${userName}\\n\\n${userPhone}\"}}\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "Yes and your job is to only return a generated mail using the users detail looking something like this:\\nRespected Hiring Manager,\\nMy name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.\\n\\nI am very interested in Software development and have upskilled myself in technology such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.\\n\\nI assure you that I will be very diligent in my work and I am also attaching my work sample in this email which shows my logical skills and way of solving a problem effectively and efficiently, I wanted to apply for any vacant position in this particular field at your company.\\n\\nThese are some of my work samples for your reference:\\nRahul Sahani [Portfolio]\\nRahul Sahani [GitHub]\\nNote Sync using MERN\\nAnime Streaming Site\\nMatrix Hackathon\\n\\n\\nPFA\\n1) CV - Drive URL\\n2) Cover Letter - Drive URL\\n\\nThank You for your time and consideration, kindly contact me if any opportunity comes up.\\n\\n--\\nRegards,\\nRahul Sahani\\n9355161515 in all the three formats\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "{\"format1\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.\\n\\n\\nI assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at  for the role of , and would appreciate it if you could kindly view my application.\\n\\n\\nThese are some of my work samples for your reference:\\n\\nRahul Sahani [Portfolio]\\n\\nRahul Sahani [GitHub]\\n\\nNote Sync using MERN\\n\\nAnime Streaming Site\\n\\nMatrix Hackathon\\n\\n\\nPFA\\n\\n\\n1) CV - Drive URL\\n\\n2) Cover Letter - Drive URL\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\nRahul Sahani\\n\\n9355161515\"}, \"format2\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.\\n\\n\\nI assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.\\n\\n\\nThese are some of my work samples for your reference:\\n\\nRahul Sahani [Portfolio]\\n\\nRahul Sahani [GitHub]\\n\\nNote Sync using MERN\\n\\nAnime Streaming Site\\n\\nMatrix Hackathon\\n\\n\\nPFA\\n\\n\\n1) CV - Drive URL\\n\\n2) Cover Letter - Drive URL\\n\\n\\nThank you for your time and consideration. Kindly contact me if any opportunity comes up.\\n\\n\\n--\\n\\nRegards,\\n\\nRahul Sahani\\n\\n9355161515\"}, \"format3\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,\\n\\n\\nMy name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.\\n\\n\\nI am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.\\n\\n\\nI assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of  at  and would greatly appreciate it if you could review my profile and consider me for this role.\\n\\n\\nThese are some of my work samples for your reference:\\n\\nRahul Sahani [Portfolio]\\n\\nRahul Sahani [GitHub]\\n\\nNote Sync using MERN\\n\\nAnime Streaming Site\\n\\nMatrix Hackathon\\n\\n\\nPFA\\n\\n\\n1) CV - Drive URL\\n\\n2) Cover Letter - Drive URL\\n\\n\\nThank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.\\n\\n\\n--\\n\\nRegards,\\n\\nRahul Sahani\\n\\n9355161515\"}}\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "Remove any empty or not provided fields and return the generated mail in all the three formats\n. For example, if the user does not provide any social links, then the social links section should not be included in the generated mail.\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "{\"format1\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,<br/><br/>\\n      My name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>\\n      I am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.<br/><br/>\\n      I assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at  for the role of , and would appreciate it if you could kindly view my application.<br/><br/>\\n      These are some of my work samples for your reference:<br/>\\n      Rahul Sahani [Portfolio]<br/>\\n      Rahul Sahani [GitHub]<br/>\\n      Note Sync using MERN<br/>\\n      Anime Streaming Site<br/>\\n      Matrix Hackathon<br/><br/>\\n      PFA<br/>\\n      1) CV - Drive URL<br/>\\n      2) Cover Letter - Drive URL<br/><br/>\\n      Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>\\n      --<br/>\\n      Regards,<br/>\\n      Rahul Sahani<br/>\\n      9355161515\"}, \"format2\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,<br/><br/>\\n      My name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>\\n      I am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.<br/><br/>\\n      I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>\\n      These are some of my work samples for your reference:<br/>\\n      Rahul Sahani [Portfolio]<br/>\\n      Rahul Sahani [GitHub]<br/>\\n      Note Sync using MERN<br/>\\n      Anime Streaming Site<br/>\\n      Matrix Hackathon<br/><br/>\\n      PFA<br/>\\n      1) CV - Drive URL<br/>\\n      2) Cover Letter - Drive URL<br/><br/>\\n      Thank you for your time and consideration. Kindly contact me if any opportunity comes up.<br/><br/>\\n      --<br/>\\n      Regards,<br/>\\n      Rahul Sahani<br/>\\n      9355161515\"}, \"format3\": {\"text\": \"\", \"html\": \"Respected Hiring Manager,<br/><br/>\\n      My name is Rahul Sahani, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>\\n      I am very interested in Software Development and have upskilled myself in technologies such as JAVA, Node JS, SQL, MongoDB, ExpressJS, Next JS and React JS.<br/><br/>\\n      I assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of  at  and would greatly appreciate it if you could review my profile and consider me for this role.<br/><br/>\\n      These are some of my work samples for your reference:<br/>\\n      Rahul Sahani [Portfolio]<br/>\\n      Rahul Sahani [GitHub]<br/>\\n      Note Sync using MERN<br/>\\n      Anime Streaming Site<br/>\\n      Matrix Hackathon<br/><br/>\\n      PFA<br/>\\n      1) CV - Drive URL<br/>\\n      2) Cover Letter - Drive URL<br/><br/>\\n      Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>\\n      --<br/>\\n      Regards,<br/>\\n      Rahul Sahani<br/>\\n      9355161515\"}}\n"
        }
        ],
      },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

// Function to generate email content from format using Gemini
async function generateEmailContentFromFormat({ 
  format = "", 
  userName = "", 
  userEducation = "", 
  userCertification = "", 
  jobProfile = "", 
  userSkills = "", 
  companyName = "", 
  companyPost = "", 
  companyPostURL = "", 
  socialLinks = "", 
  projects = "",
  userPhone = "" ,
  resumeUrl = "",
  cvUrl = ""
}) {
  // Implement the logic to generate email content based on the format provided
  // You can use the emailContents object to access different formats
  console.log("Format:", format);

  let newEmail = "";

  if (!emailContents[format]) {
    console.error("Invalid format provided");
  }

  if (!userName || !userEducation || !userCertification || !jobProfile || !userSkills || !companyName || !companyPost || !companyPostURL || !userGithub || !userPortfolio1 || !userPortfolio2 || !userPortfolio3 || !userPhone) {
    console.error("Missing required input fields");
  }

  if (format === "format1") {
     newEmail = emailContents.format1(
      userName,
      userEducation,
      userCertification,
      jobProfile,
      userSkills,
      companyName,
      companyPost,
      companyPostURL,
      socialLinks,
projects,
      userPhone,
      resumeUrl,
      cvUrl
    );
  }

  if (format === "format2") {
    newEmail = emailContents.format2(
      userName,
      userEducation,
      userCertification,
      userSkills,
      socialLinks,
      projects,
      userPhone,
      resumeUrl,
      cvUrl
    );
  }

  if (format === "format3") {
    newEmail = emailContents.format3(
      userName,
      userEducation,
      userCertification,
      userSkills,
      companyName,
      companyPost,
      companyPostURL,
      socialLinks,
projects,
      userPhone,
      resumeUrl,
      cvUrl
    );
  }

  const result = await chatSession.sendMessage(newEmail.html);

  console.log("Email Content:", result.response.text());
  console.log("Email Content HTML:", JSON.parse(result.response.text())[format]["html"]);
  return JSON.parse(result.response.text());
}



module.exports = { chatSession, generateEmailContentFromFormat };


[
  {
  "format1": {
  "text": "",
  "html": "Respected Hiring Manager,<br/><br/>\n      My name is Coding Dev, and I have recently completed my . I am a certified  and am actively seeking job opportunities.<br/><br/>\n      I am very interested in  and have upskilled myself in technologies such as .<br/><br/>\n      I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>\n      These are some of my work samples for your reference:<br/>\n      <a href=\"\">Coding Dev Github</a><br/>\n      <a href=\"\">Project 1</a><br/>\n      <a href=\"\">Project 2</a><br/>\n      <a href=\"\">Project 3</a><br/><br/>\n      PFA<br/>\n      1) CV<br/>\n      2) Cover Letter<br/><br/>\n      Thank you for your time and consideration. Kindly contact me if any opportunity comes up.<br/><br/>\n      --<br/>\n      Regards,<br/>\n      Coding Dev<br/>\n      undefined"
  }
  },
  {
  "format2": {
  "text": "",
  "html": "Respected Hiring Manager,<br/><br/>\n      My name is Coding Dev, and I have recently completed my . I am a certified  and am actively seeking job opportunities.<br/><br/>\n      I am very interested in  and have upskilled myself in technologies such as .<br/><br/>\n      I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>\n      These are some of my work samples for your reference:<br/>\n      <a href=\"\">Coding Dev Github</a><br/>\n      <a href=\"\">Project 1</a><br/>\n      <a href=\"\">Project 2</a><br/>\n      <a href=\"\">Project 3</a><br/><br/>\n      PFA<br/>\n      1) CV<br/>\n      2) Cover Letter<br/><br/>\n      Thank you for your time and consideration. Kindly contact me if any opportunity comes up.<br/><br/>\n      --<br/>\n      Regards,<br/>\n      Coding Dev<br/>\n      undefined"
  }
  },
  {
  "format3": {
  "text": "",
  "html": "Respected Hiring Manager,<br/><br/>\n      My name is Coding Dev, and I have recently completed my . I am a certified  and am actively seeking job opportunities.<br/><br/>\n      I am very interested in  and have upskilled myself in technologies such as .<br/><br/>\n      I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>\n      These are some of my work samples for your reference:<br/>\n      <a href=\"\">Coding Dev Github</a><br/>\n      <a href=\"\">Project 1</a><br/>\n      <a href=\"\">Project 2</a><br/>\n      <a href=\"\">Project 3</a><br/><br/>\n      PFA<br/>\n      1) CV<br/>\n      2) Cover Letter<br/><br/>\n      Thank you for your time and consideration. Kindly contact me if any opportunity comes up.<br/><br/>\n      --<br/>\n      Regards,<br/>\n      Coding Dev<br/>\n      undefined"
  }
  }
  ]