const { loginService, signupService, updatePasswordService, forgotPasswordService, verifyOTPService, changePasswordService } = require("../service/authService")
const ApiError = require("../utils/apiUtils/apiError")
const { createAccessToken, verifyRefreshToken } = require("../utils/token")

async function login(req, res) {
    try {
        const loginResponse = await loginService(req, res);
        return res.status(200).json({success: true, message: "LOGGED In", data: loginResponse})
    }
    catch (error) {
        return res.status(error.statusCode).json({success: false,message: error.message})
    }
}

async function signup(req, res) {
    try {
        const signupResponse = await signupService(req);
        return res.status(200).json({ success: true,message: "User Registered",data: signupResponse})
    }
    catch (error) {
        return res.status(error.statusCode).json({success: false,message: error.message})
    }
}

async function generateAccessToken(req, res) {
    try {
        const refreshtoken = getTokenFromHeader(req);
        const isTokenValid = verifyRefreshToken(refreshtoken);
        if (!isTokenValid.success) return isTokenValid;
        const _id = isTokenValid.data._id;

        const existingUser = await User.findById({ _id });
        if (!existingUser) throw new ApiError("User not found", 400);

        const accessToken = createAccessToken({ _id: _id });
        const refreshToken = createRefreshToken({ _id: _id });

        const updatedUser = await User.findOneAndUpdate({ _id }, { refreshToken }, { new: true });

        return res.status(200).json({ success: true, message: "Access token generated successfully!", data: { accessToken: accessToken, refreshToken: refreshToken } })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message, success:false })
    }
}

async function updatePassword(req, res) {
    try {
        const updatePasswordResponse = await updatePasswordService(req);
        return res.status(200).json({success: true,message:"Password Updated",data:updatePasswordResponse})
    }
    catch (error) {
        return res.status(error.statusCode).json({success: false,message: error.message})
    }
}

async function forgotPassword(req, res) {
    try {
        const forgotPasswordResponse = await forgotPasswordService(req);
        return res.status(200).json({ success: true, message: forgotPasswordResponse })
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({ success: false, message: error.message })
    }
}

async function verifyOTP(req, res) {
    try {
        const verifyOTPResponse = await verifyOTPService(req);
        return res.status(200).json({ success: true, message: verifyOTPResponse })
    }
    catch (error) {
        return res.status(error.statusCode).json({ success: false, message: error.message })
    }
}

async function changePassword(req, res) {
    try {
        const changePasswordResponse = await changePasswordService(req);
        return res.status(200).json({ message: changePasswordResponse })
    }
    catch (error) {
        return res.status(error.statusCode).json({ success: false, message: error.message })
    }
}

module.exports = { login, signup, generateAccessToken, updatePassword, forgotPassword, verifyOTP, changePassword }