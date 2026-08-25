const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter;

async function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  const t = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await t.verify();
    return t;
  } catch (error) {
    console.log('Email transporter verification failed, falling back to console logger:', error.message);
    return null;
  }
}

async function getTransporter() {
  if (!transporter) {
    transporter = await createTransporter();
  }
  return transporter;
}

const sendRegistrationEmail = async (
  studentEmail,
  studentName,
  eventTitle,
  eventDate,
) => {
  const t = await getTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmail,
    subject: `Registration Confirmed: ${eventTitle}`,
    text: `Hi ${studentName},\n\nYou have been successfully registered for "${eventTitle}" on ${eventDate}.\n\nRegards,\nJSS Academy Events Team`,
  };

  if (t) {
    try {
      await t.sendMail(mailOptions);
      console.log(`Email sent to ${studentEmail}`);
    } catch (error) {
      console.log("Email send error:", error);
    }
  } else {
    console.log(`[DEV EMAIL] To: ${studentEmail}, Subject: ${mailOptions.subject}, Body: ${mailOptions.text}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const t = await getTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to College Events',
    text: `Hi ${name}, your account has been created successfully!`
  };

  if (t) {
    try {
      await t.sendMail(mailOptions);
    } catch (err) {
      console.log('Welcome email error:', err);
    }
  } else {
    console.log(`[DEV EMAIL] To: ${email}, Subject: ${mailOptions.subject}, Body: ${mailOptions.text}`);
  }
};

module.exports = { sendRegistrationEmail, sendWelcomeEmail, getTransporter };