const User = require("../models/user");
const ApiError = require("../utils/apiUtils/apiError")
const { createHash, verifyHash } = require("../utils/hash")
const { createAccessToken, createRefreshToken, getTokenFromHeader, verifyRefreshToken, verifyAccessToken } = require("../utils/token")
const generateOtp = require("../utils/OTP")
const sendEmail = require("../config/nodemailer")

async function loginService(req, res) {

        const { emailId, password } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (!existingUser) return new ApiError("Invalid credentials!", 400);

        const isValidPassword = await verifyHash(password, existingUser.password);
        console.log("isValidpassword", isValidPassword);

        const accessToken = createAccessToken({ _id: existingUser._id });
        const refreshToken = createRefreshToken({ _id: existingUser._id });

        const updatedUser = await User.findOneAndUpdate({ emailId }, { token: refreshToken }, { new: true });
        return { refreshToken: refreshToken, accessToken: accessToken };
}

async function signupService(req, res) {
        const { userName, emailId, password, role } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (existingUser) return new ApiError("This email already exists!", 400);

        const hashedPassword = await createHash(password);

        const newUser = new User({ userName, emailId, password: hashedPassword, role });
        await newUser.save();
        newUser.password = undefined;
        console.log("new user", newUser)
        return newUser;

}

async function updatePasswordService(req, res) {
        const { emailId, newPassword } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (!existingUser) return new ApiError("User does not exist!", 400);

        const hashedPassword = await createHash(newPassword);

        const newUser = await User.find({ emailId }, { password: hashedPassword});
        newUser.password = undefined;
        return newUser;
}

async function forgotPasswordService(req, res) {
        const { emailId } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (!existingUser) return new ApiError("Invalid credentials", 400);

        const otpResponse = generateOtp();
        console.log("otp response", otpResponse)

        const otp = otpResponse;
        const token = createAccessToken({ _id: existingUser._id });

        const emailResponse = await sendEmail({ OTP: otp, emailId: emailId, token: token })
        if (!emailResponse.success) return new ApiError("Can't send email", 500);
        const hashedOtp = await createHash(otp);

        const updatedUser = await User.findOneAndUpdate({ emailId }, { otp: hashedOtp }, { new: true });

        return "OTP sent!";

}

async function verifyOTPService(req) {
        const { OTP } = req.body;
        const { token } = req.params;

        const isValidToken = verifyAccessToken(token);
        const existingUser = await User.findById({_id: isValidToken._id });

        const isValidOtp = verifyHash(OTP, existingUser.otp);
        return "OTP matched!";

}

async function changePasswordService(req) {
        const { emailId, newPassword } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (!existingUser) return new ApiError("user does not exist!", 404);

        const newPasswordHash = await createHash(newPassword);

        const updatedUser = await User.findOneAndUpdate({ emailId }, { password: newPasswordHash }, { new: true })
        return "Password changed!";
}

module.exports = { signupService, loginService, updatePasswordService, forgotPasswordService, verifyOTPService, changePasswordService }