const {getTokenFromHeader,verifyAccessToken}=require("../utils/token")
const ApiError =require("../utils/apiUtils/apiError")
const User=require("../models/user")

async function userAuth(req,res,next){
    try{
        const token=getTokenFromHeader(req);
        if(!token)throw new ApiError("Access Token is missing",400);

        const isTokenValid=verifyAccessToken(token);
        const _id=isTokenValid._id; 

        const existingUser=await User.findById({_id});
        if(!existingUser) throw new ApiError("No user exists with this id!",400);

        req.body.user={_id:_id};
        next();
    }catch(error){
        return res.status(error.statusCode|| 500).json({success:false,message:error.message})
    }
}

module.exports={userAuth}