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
    socialLinks,
    projects,
    userPhone,
    resumeUrl,
    cvUrl
  ) => ({
    text: "",
    html: `Respected Hiring Manager,<br/><br/>
        My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
        I am very interested in ${
          jobProfile || ""
        } and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
        I assure you of my full diligence in my work and therefore I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I have applied for an entry-level position at ${companyName} for the role of <a href="${companyPostURL}">${companyPost}</a>, and would appreciate it if you could kindly view my application.<br/><br/>
        These are some of my work samples for your reference:<br/>
  
        // Social Links here format examples (strictly do not use them in generated mails, they for reference only): <a href="https://linkedin.com/johndoe">John Doe</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided 
        ${socialLinks}
  
        // Projects here format (input project name: url): <a href="https://abc.com">Project Name</a><br/> or <a href="https://github.com/gemini-project">Gemini Project</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided
        ${projects}
  
        PFA<br/>
        1) <a href="${resumeUrl}">Cover Letter</a><br/>
        2) <a href="${cvUrl}">CV</a><br/><br/>
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
    socialLinks,
    projects,
    userPhone,
    resumeUrl,
    cvUrl
  ) => ({
    text: "",
    html: `Respected Hiring Manager,<br/><br/>
        My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
        I am very interested in ${jobProfile} and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
        I assure you that I will be very diligent in my work and I am attaching my work sample in this email, which shows my logical skills and effective problem-solving approach. I wanted to apply for any vacant position in this particular field at your company.<br/><br/>
        These are some of my work samples for your reference:<br/>
  
        // Social Links here format examples (strictly do not use them in generated mails, they for reference only): <a href="https://linkedin.com/johndoe">John Doe</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided 
        ${socialLinks}
  
        // Projects here format: <a href="abc.com">Project Name</a><br/> or <a href="github.com/gemini-project">Project Name</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided
        ${projects}
  
        PFA<br/>
        1) <a href="${resumeUrl}">Cover Letter</a><br/>
        2) <a href="${cvUrl}">CV</a><br/><br/>
  
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
    companyName,
    companyPost,
    companyPostURL,
    socialLinks,
    projects,
    userPhone,
    resumeUrl,
    cvUrl
  ) => ({
    text: "",
    html: `Respected Hiring Manager,<br/><br/>
        My name is ${userName}, and I have recently completed my ${userEducation}. I am a certified ${userCertification} and am actively seeking job opportunities.<br/><br/>
        I am very interested in ${
          jobProfile || ""
        } and have upskilled myself in technologies such as ${userSkills}.<br/><br/>
        I assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of <a href="${companyPostURL}">${companyPost}</a> at ${companyName} and would greatly appreciate it if you could review my profile and consider me for this role.<br/><br/>
        These are some of my work samples for your reference:<br/>
  
        // Social Links here format examples (strictly do not use them in generated mails, they for reference only): <a href="https://linkedin.com/johndoe">John Doe</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided 
        ${socialLinks}
  
        // Projects here format: <a href="abc.com">Project Name</a><br/> or <a href="github.com/gemini-project">Project Name</a><br/> PS: remove this line and section if not needed or is not applicable or empty or not provided
        ${projects}
  
        PFA<br/>
        1) <a href="${resumeUrl}">Cover Letter</a><br/>
        2) <a href="${cvUrl}">CV</a><br/><br/>
  
        Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>
        --<br/>
        Regards,<br/>
        ${userName}<br/>
        ${userPhone}`,
  }),
};

// Export the emailContents object
module.exports = {emailContents};