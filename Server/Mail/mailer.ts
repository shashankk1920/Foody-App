import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use 'gmail' or custom SMTP provider
  auth: {
    user: process.env.SMTP_USER, // your Gmail or SMTP username
    pass: process.env.SMTP_PASS, // your Gmail app password or SMTP password
  },
});

export const sender = {
  email: process.env.SMTP_USER!,
  name: "FOODY APP",
};
