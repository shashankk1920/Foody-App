"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, user) => {
    // if furthur it will show the error than we have to see that whether it is working or not than we will change it to IUserDocument
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 86400000 });
    return token;
};
exports.generateToken = generateToken;
