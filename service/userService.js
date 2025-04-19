const ApiError = require("../utils/apiUtils/apiError");


const findUser = async (req) => {
        const {userName,emailId,_id}=req.query;
        if(!userName && !emailId && !_id)return new ApiError("User Id IS MISSING",400)
        let queryObject={};
        if(userName)queryObject.userName=userName;
         if(emailId)queryObject.emailId=emailId;
        if(_id)queryObject._id=_id;

        const existingUser=await User.findOne(...query);
        if(!existingUser.length)return new ApiError("USER NOT FOUND",404)

        return existingUser;
}

const updateUser=async(req)=>{
    const {emailId,_id}=req.query;
    const {userName,imageUrl}=req.body
    if(!emailId && !_id)return new ApiError("EmailId is missing",400);

    let queryObject={};
        if(_id)queryObject._id=_id;
        if(emailId)queryObject.emailId=emailId;

        const existingUser=await User.findOneAndUpdate(...query,{userName,imageUrl});
        if(!existingUser)return new ApiError("USER NOT FOUND",404);
        return existingUser;
}

const deleteUser=async(req)=>{
    const {_id}=req.query;
    if(!_id)return new ApiError("User id is missing",404);

    const existingUser=await User.findOneAndUpdate({_id},{isDeleted:new Date.now()});
    if(!existingUser)return new ApiError("USER NOT FOUND",404);

    return existingUser;
}

