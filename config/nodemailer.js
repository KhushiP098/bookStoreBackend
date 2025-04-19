const nodemailer=require("nodemailer")
const ApiError=require("../utils/apiUtils/apiError")
const ApiResponse=require("../utils/apiUtils/apiResponse")

async function sendEmail({OTP,emailId,token}){
    try{

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER_NAME ,
                pass:process.env.EMAIL_PASSWORD  ,
            }
        });

        const url=`http://localhost:4000/bookStore/changePassword/${token}`;

        const mailOptions={
            from : process.env.EMAIL_PASSWORD,
            to:emailId,
            subject:"Verification code for changing Password",
            text:`OTP for changing the password is ${OTP}.Click the link given below and enter the otp. Link-${url}.This  otp is valid for only 15 minutes`
        }
        const response=transporter.sendMail(mailOptions);
        return response.envelope;
    }
    catch(error){
        return new ApiError(500,"Can't send email!")
    }
}
module.exports=sendEmail;