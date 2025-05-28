"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const htmlEmail_1 = require("./htmlEmail");
const mailer_1 = require("./mailer");
const sendVerificationEmail = async (email, verificationToken) => {
    const html = htmlEmail_1.htmlContent.replace("{verificationToken}", verificationToken);
    try {
        await mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Verify your email",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send email verification");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, name) => {
    const html = (0, htmlEmail_1.generateWelcomeEmailHtml)(name);
    try {
        await mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Welcome to Foody",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send welcome email");
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetURL) => {
    const html = (0, htmlEmail_1.generatePasswordResetEmailHtml)(resetURL);
    try {
        await mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Reset your password",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to reset password");
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    const html = (0, htmlEmail_1.generateResetSuccessEmailHtml)();
    try {
        await mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Password Reset Successfully",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send password reset success email");
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
