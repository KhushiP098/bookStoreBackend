const otpGenerator = require('otp-generator');
const ApiError=require("./apiUtils/apiError")
const ApiResponse=require("./apiUtils/apiResponse")

function generateOtp(){
    try{
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        return OTP
    }
    catch(error){
        return ApiError("Error in generating otp!",500)
    }
}

module.exports=generateOtp;