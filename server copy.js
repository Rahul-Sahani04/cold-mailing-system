const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const cron = require("node-cron");
const { google } = require("googleapis");
require("dotenv").config();

const { generateEmailContentFromFormat, chatSession } = require("./GeminiAPI");

const { emailContents } = require("./EmailFormat");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4001/oauth2callback" // This should match the redirect URI in the Google Cloud Console
);



const scheduledTasks = {}; // Using an object to store tasks per user
const userTokens = {}; // In-memory store for demonstration

function getTokensForUser(userId) {
  return new Promise((resolve, reject) => {
    const tokens = userTokens[userId];
    if (tokens) {
      resolve(tokens);
    } else {
      reject('No tokens found for user');
    }
  });
}

function updateTokensForUser(userId, tokens) {
  return new Promise((resolve) => {
    userTokens[userId] = tokens;
    resolve();
  });
}



const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// API to return the email formats based on the user's choice
app.get("/email-formats/:format", (req, res) => {
  const { format } = req.params;
  console.log("Format:", format);
  console.log("EmailContent:", emailContents[format]());
  if (emailContents[format]) {
    res.send({ success: true, content: emailContents[format]().html });
  } else {
    res.status(404).send({ success: false, error: "Invalid format" });
  }
});

// API to chat with Gemini API and get response from the bot using the user's message
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await chatSession(message);
    res.send({ success: true, response });
  } catch (error) {
    console.error("Error chatting with Gemini API:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// API to generate a preview of the email content using Gemini API
app.post("/generate-email-content", async (req, res) => {
  const {
    format,
    name,
    email,
    phone,
    education,
    userCertification,
    userSkills,
    companyName,
    companyPost,
    companyPostURL,
    socialLinks,
    projects,
    message,
    resumeUrl,
    cvUrl,
  } = req.body;

  console.log("Request body:", req.body);
  try {
    const content = await generateEmailContentFromFormat({
      format: format,
      userName: name,
      userEmail: email,
      userPhone: phone,
      userEducation: education,
      userCertification: userCertification,
      userSkills: userSkills,
      companyName: companyName,
      companyPost: companyPost,
      companyPostURL: companyPostURL,
      socialLinks: socialLinks,
      projects: projects,
      message: message,
      resumeUrl: resumeUrl,
      cvUrl: cvUrl,
    });
    console.log("Content:", content[format]);
    res.send({ success: true, content: content[format] });
  } catch (error) {
    console.error("Error generating email content:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});


app.get("/oauth2callback", (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error getting OAuth tokens:', err);
      return res.status(500).send('Error getting OAuth tokens');
    }
    oauth2Client.setCredentials(tokens);
    // Store tokens as necessary
    res.redirect('/success');
  });
});


app.post('/exchange-code', async (req, res) => {
  const { code, userId } = req.body;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    await updateTokensForUser(userId, tokens);

    res.send({ success: true, access_token: tokens.access_token, refresh_token: tokens.refresh_token, user: tokens });
  } catch (error) {
    console.error('Error exchanging code:', error);
    res.status(500).send('Error exchanging code');
  }
});


// Send email immediately using Gmail API and OAuth2 access token of the user
app.post("/send-email", upload.none(), async (req, res) => {
  const {
    userName,
    userEmail,
    emails,
    subject,
    format,
    accessToken,
  } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

    // Generate email content using Gemini
    const content = await generateEmailContentFromFormat({
      format: format,
      userName: userName,
      userEmail: userEmail,
      emails: emails,
      subject: subject,
    });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  console.log("HTML Content: ", content[format].html);

  // Construct email
  const emailLines = [
    `To: ${emails}`,
    "Content-type: text/plain; charset=utf-8",
    `Subject: ${subject}`,
    "",
    content[format].html,
  ];

  // Encode email in base64
  const email = emailLines.join("\n").trim();
  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Send the email
  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedEmail,
    },
  });

  console.log("Email sent:", response.data);
  res.send({ message: "Email sent successfully", messageId: response.data.id });
});

// Send email immediately using Gmail API and OAuth2 access token of the user (Custom email content)
app.post("/send-custom-email", upload.none(), async (req, res) => {
  const {
    emails,
    subject,
    customFormat,
    accessToken,
  } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  // Generate email content using Gemini
  const content = customFormat;

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  console.log("HTML Content: ", content);

  let messageIds = [];

  // Loop through the emails and send them one by one
  for (const email of emails.split(",")) {
    // Construct email
    const emailLines = [
      `To: ${email}`,
      "Content-type: text/plain; charset=utf-8",
      `Subject: ${subject}`,
      "",
      content,
    ];

    // Encode email in base64
    const emailData = emailLines.join("\n").trim();
    const encodedEmail = Buffer.from(emailData)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log("Email sent:", response.data);

    messageIds.push(response.data.id);
  }

  res.send({ message: "Email sent successfully", messageId: messageIds });
});

app.post("/schedule-email", upload.none(), async (req, res) => {
  const {
    userId,
    userName,
    userEmail,
    emails,
    subject,
    format,
    scheduleTime,
    accessToken,
  } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  // Generate email content using Gemini
  const content = await generateEmailContentFromFormat({
    format: format,
    userName: userName,
    userEmail: userEmail,
    emails: emails,
    subject: subject,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  console.log("HTML Content: ", content[format].html);

  // Construct email
  const emailLines = [
    `To: ${emails}`,
    "Content-type: text/plain; charset=utf-8",
    `Subject: ${subject}`,
    "",
    content[format].html,
  ];

  // Encode email in base64
  const email = emailLines.join("\n").trim();
  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Send the email

  const task = cron.schedule(
    scheduleTime,
    async () => {
      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedEmail,
        },
      });
    },
    {
      timezone: "Asia/Kolkata",
    }
  );

  if (!scheduledTasks[userId]) {
    scheduledTasks[userId] = [];
  }
  scheduledTasks[userId].push({ task, mailOptions, scheduleTime });

  res.status(200).send("Email scheduled successfully");
});



app.post("/schedule-custom-email", upload.none(), async (req, res) => {
  const {
    userId,
    emails, // Assuming emails is a comma-separated string
    subject,
    scheduleTime,
    formatData,
  } = req.body;

  try {
    const tokens = await getTokensForUser(userId);

    oauth2Client.setCredentials(tokens);

    const content = formatData;
    const emailArray = emails.split(',');

    emailArray.forEach(email => {
      const emailLines = [
        `To: ${email.trim()}`,
        "Content-type: text/plain; charset=utf-8",
        `Subject: ${subject}`,
        "",
        content,
      ];

      const emailBody = emailLines.join("\n").trim();
      const encodedEmail = Buffer.from(emailBody)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const task = cron.schedule(
        scheduleTime,
        async () => {
          try {
            // Ensure token is refreshed if necessary
            if (oauth2Client.isTokenExpiring()) {
              const { credentials } = await oauth2Client.refreshAccessToken();
              oauth2Client.setCredentials(credentials);
              // Update stored tokens with new credentials
              await updateTokensForUser(userId, credentials);
            }

            const gmail = google.gmail({ version: "v1", auth: oauth2Client });

            console.log(`Sending email to ${email}`);
            const response = await gmail.users.messages.send({
              userId: "me",
              requestBody: {
                raw: encodedEmail,
              },
            });
            console.log(`Email sent to ${email}:`, response);
          } catch (error) {
            console.error(`Failed to send email to ${email}:`, error);
          }
        },
        {
          timezone: "Asia/Kolkata",
        }
      );

      if (!scheduledTasks[userId]) {
        scheduledTasks[userId] = [];
      }
      scheduledTasks[userId].push({ task, email: emailLines, scheduleTime });
    });

    res.status(200).send("Emails scheduled successfully");
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Error getting tokens');
  }
});





app.get("/scheduled-emails/:userId", (req, res) => {
  const { userId } = req.params;
  if (scheduledTasks[userId]) {
    res.status(200).json(
      scheduledTasks[userId]
        .map((task, index) => ({
          index,
          mailOptions: task.mailOptions,
          scheduleTime: task.scheduleTime,
        }))
        .sort((a, b) => a.scheduleTime.localeCompare(b.scheduleTime))
    );
  } else {
    res.status(200).json([]);
  }
});

app.delete("/delete-scheduled-email/:userId/:index", (req, res) => {
  const { userId, index } = req.params;
  if (scheduledTasks[userId] && scheduledTasks[userId][index]) {
    const [removedTask] = scheduledTasks[userId].splice(index, 1);
    removedTask.task.stop();
    res.status(200).send(`Scheduled email at index ${index} has been deleted.`);
  } else {
    res.status(400).send("Invalid index.");
  }
});

app.put("/update-scheduled-email/:userId/:index", upload.none(), (req, res) => {
  const { userId, index } = req.params;
  const {
    userName,
    userEmail,
    emails,
    subject,
    format,
    scheduleTime,
    refreshToken,
    accessToken,
  } = req.body;

  if (
    index < 0 ||
    !scheduledTasks[userId] ||
    index >= scheduledTasks[userId].length
  ) {
    return res.status(400).send("Invalid index");
  }

  // Generate email content using Gemini
  const content = generateEmailContentFromFormat(format);

  const mailOptions = {
    from: `"${userName}" <${userEmail}>`,
    to: emails,
    subject: subject,
    text: content.text,
    html: content.html,
  };

  scheduledTasks[userId][index].task.stop();
  const task = cron.schedule(
    scheduleTime,
    () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: userEmail,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    },
    {
      timezone: "Asia/Kolkata",
    }
  );

  scheduledTasks[userId][index] = { task, mailOptions, scheduleTime };

  res.status(200).send("Scheduled email updated successfully");
});

app.listen(4001, () => {
  console.log(`Server is running on port 4001`);
});
