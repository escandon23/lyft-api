import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/send', async (req, res) => {
  const { firstName, lastName, email, phone, password , confirmPassword , country} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New User Registration',
      html: `
        <h3>User Registration Info</h3>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Password:</strong> ${password}</p>
         <p><strong>Confirm Password:</strong> ${confirmPassword}</p>
        <p><strong>Country:</strong> ${country}</p>

      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email failed to send.' });
  }
});

export default router;
