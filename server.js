const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tg21014@gmail.com',
        pass: 'mshl cjjo gpbc nhms'
    }
});

const emailContents = {
    format1: (companyName, companyPost, companyPostURL) => ({
        text: '',
        html: `Respected Hiring Manager,<br/><br/>
        My name is Tushar Gupta, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>
        I am very interested in Software development and have upskilled myself in technology such as JAVA, J2EE, Node Js, SQL, C++, ExpressJs and React.<br/><br/>
        I assure you of full diligence in my work and therefore I am also attaching my work sample in this email which shows my logical skills and way of solving a problem effectively and efficiently. Therefore, I've applied for an entry-level opening at ${companyName} for the position of <a href="${companyPostURL}">${companyPost}</a>, and would appreciate if you could kindly view it once.<br/><br/>
        These are some of my work samples for your reference:<br/>
        <a href="https://www.github.com/tushar">Tushar Github</a><br/>
        <a href="https://www.leadershiptalks.com">Leadership Talks</a><br/>
        <a href="https://www.notesync.com">Note Sync using MERN</a><br/>
        <a href="https://www.matrixhackathon.com">Matrix Hackathon</a><br/><br/>
        PFA<br/>
        1) Cover Letter<br/>
        2) CV<br/><br/>
        Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>
        --<br/>
        Regards,<br/>
        Tushar Gupta<br/>
        9354832511`
    }),
    format2: {
        text: '',
        html: `Respected Hiring Manager,<br/>
        My name is Tushar Gupta, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>
        I am very interested in Software development and have upskilled myself in technology such as JAVA, J2EE, Node Js, SQL, C++, Express Js, and React.<br/><br/>
        I assure you that I will be very diligent in my work and I am also attaching my work sample in this email which shows my logical skills and way of solving a problem effectively and efficiently, I wanted to apply for any vacant position in this particular field at your company.<br/><br/>
        
        These are some of my work samples for your reference:<br/>
        <a href="https://www.github.com/tushar21014">Tushar Github</a><br/>
        <a href="https://iitminternware.com//2024-25/events/Leadership%20Talks/Homepage/index.php">Leadership Talks</a><br/>
        <a href="https://note-sync-rs.vercel.app/about">Note Sync using MERN</a><br/>
        <a href="https://www.iitminternware.com/2023-24/MATRIX/index.php">Matrix Hackathon</a><br/><br/>
        
        PFA<br/>
        1) CV<br/>
        2) Cover Letter<br/><br/>
        
        Thank You for your time and consideration, kindly contact me if any opportunity comes up.<br/><br/>
        
        --<br/>
        Regards,<br/>
        Tushar Gupta<br/>
        9354832511`
    },
    format3:(companyName, companyPost, companyPostURL) => ({
        text: '',
        html: `Respected Hiring Manager,<br/><br/>
        My name is Tushar Gupta, and I have recently completed my Bachelor of Computer Applications from GGSIPU. I am actively seeking job opportunities.<br/><br/>
        I am very interested in Software development and have upskilled myself in technology such as JAVA, J2EE, Node Js, SQL, C++, ExpressJs and React.<br/><br/>
        I assure you of my full diligence in my work. I have attached my work sample to this email, showcasing my logical skills and my approach to solving problems effectively and efficiently. I am interested in the entry-level position of <a href="${companyPostURL}">${companyPost}</a> at ${companyName} and would greatly appreciate it if you could review my profile and consider me for this role.<br/><br/>
        These are some of my work samples for your reference:<br/>
        <a href="https://www.github.com/tushar">Tushar Github</a><br/>
        <a href="https://www.leadershiptalks.com">Leadership Talks</a><br/>
        <a href="https://www.notesync.com">Note Sync using MERN</a><br/>
        <a href="https://www.matrixhackathon.com">Matrix Hackathon</a><br/><br/>
        PFA<br/>
        1) Cover Letter<br/>
        2) CV<br/><br/>
        Thank you for your time and consideration. Kindly contact me if any other opportunity comes up as well.<br/><br/>
        --<br/>
        Regards,<br/>
        Tushar Gupta<br/>
        9354832511`
    })
};

app.post('/send-email', upload.none(), (req, res) => {
    const { emails, format, subject, companyName, companyPost, companyPostURL } = req.body;

    // Split the emails by comma and trim whitespace
    const emailList = emails.split(',').map(email => email.trim());

    // Generate email content based on the format and parameters
    let emailContent;
    if (format === 'format1' || format === 'format3') {
        emailContent = emailContents[format](companyName, companyPost, companyPostURL);
    } else {
        emailContent = emailContents[format];
    }

    const attachments = [
        {
            filename: 'Curriculum Vitae Tushar Gupta.pdf',
            content: fs.readFileSync('Curriculum Vitae Tushar Gupta.pdf'),
            contentType: 'application/pdf'
        },
        {
            filename: 'Tushar Cover Letter.pdf',
            content: fs.readFileSync('Tushar Cover Letter.pdf'),
            contentType: 'application/pdf'
        }
    ];

    // Send emails individually
    let emailPromises = emailList.map(email => {
        const mailOptions = {
            from: '"Tushar Gupta" <tg21014@gmail.com>',
            to: email,
            subject: subject || 'Default Subject',
            text: emailContent.text,
            html: emailContent.html,
            attachments: attachments
        };

        return transporter.sendMail(mailOptions);
    });

    // Handle the promises
    Promise.all(emailPromises)
        .then(results => {
            res.status(200).send('All emails sent successfully');
        })
        .catch(error => {
            res.status(500).send('Error sending emails: ' + error.toString());
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});