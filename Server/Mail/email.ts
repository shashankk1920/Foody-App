import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { transporter, sender } from "./mailer";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const html = htmlContent.replace("{verificationToken}", verificationToken);
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: html,
    });
  } catch (error) {
  
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = generateWelcomeEmailHtml(name);
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome to Foody",
      html: html,
    });
  } catch (error) {
  
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const html = generatePasswordResetEmailHtml(resetURL);
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: html,
    });
  } catch (error) {

    throw new Error("Failed to reset password");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const html = generateResetSuccessEmailHtml();
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Successfully",
      html: html,
    });
  } catch (error) {
   
    throw new Error("Failed to send password reset success email");
  }
};
