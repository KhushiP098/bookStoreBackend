
const findAuthor=async(req,res)=>{
    try{
        const response=await getAuthorService(req);
        return res.status(200).json({success:true,data:response});
    }
    catch(error){
        return res.status(error.statusCode).json({success:false,message:error.message})
    }
}

const updateAuthor=async(req,res)=>{
    try{
        const response=await updateAuthorService(req);
        return res.status(200).json({success:true,data:response});
    }
    catch(error){
        return res.status(error.statusCode).json({success:false,message:error.message})
    }
}

module.exports={findAuthor,updateAuthor};