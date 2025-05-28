"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your city "
    },
    country: {
        type: String,
        default: "Update your Country"
    },
    profilePicture: {
        type: String,
        default: "",
    },
    admin: { type: Boolean, default: false },
    // advanced authentication
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        dafault: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
