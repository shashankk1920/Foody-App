"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // You can use 'gmail' or custom SMTP provider
    auth: {
        user: process.env.SMTP_USER, // your Gmail or SMTP username
        pass: process.env.SMTP_PASS, // your Gmail app password or SMTP password
    },
});
exports.sender = {
    email: process.env.SMTP_USER,
    name: "FOODY APP",
};
