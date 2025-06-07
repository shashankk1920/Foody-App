"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const htmlEmail_1 = require("./htmlEmail");
const mailer_1 = require("./mailer");
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const html = htmlEmail_1.htmlContent.replace("{verificationToken}", verificationToken);
    try {
        yield mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Verify your email",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send email verification");
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const html = (0, htmlEmail_1.generateWelcomeEmailHtml)(name);
    try {
        yield mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Welcome to Foody",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send welcome email");
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = (email, resetURL) => __awaiter(void 0, void 0, void 0, function* () {
    const html = (0, htmlEmail_1.generatePasswordResetEmailHtml)(resetURL);
    try {
        yield mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Reset your password",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to reset password");
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const html = (0, htmlEmail_1.generateResetSuccessEmailHtml)();
    try {
        yield mailer_1.transporter.sendMail({
            from: `"${mailer_1.sender.name}" <${mailer_1.sender.email}>`,
            to: email,
            subject: "Password Reset Successfully",
            html: html,
        });
    }
    catch (error) {
        throw new Error("Failed to send password reset success email");
    }
});
exports.sendResetSuccessEmail = sendResetSuccessEmail;
