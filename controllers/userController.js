const {findUserService,deleteUserService,updateUserService}=require("../service/userService")

const findUser=async(req,res)=>{
    try{
        const response=await findUserService(req);
        return res.status(200).json({message:"User found",data:response})
    }
    catch(error){
        return res.status(error.statusCode||500).json({success:true,message:error.message})
    }
}

const updateUser=async(req,res)=>{
    try{
        const response=await updateUserService(req);
        return res.status(200).json({message:"User updated",data:response})
    }
    catch(error){
        return res.status(error.statusCode||500).json({success:true,message:error.message})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const response=await deleteUserService(req);
        return res.status(200).json({message:"User deleted",data:response})
    }
    catch(error){
        return res.status(error.statusCode||500).json({success:true, message:error.message})
    }
}

module.exports={findUser,updateUser,deleteUser}