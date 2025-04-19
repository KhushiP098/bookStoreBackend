const bcrypt=require("bcrypt");
const ApiError = require("./apiUtils/apiError");

async function createHash(payload){
    try{
        const hashedPassword= await bcrypt.hash(payload,10);
        return hashedPassword;
    }
    catch(error){
        return new ApiError("Failed to create hash of password",500)
    }
}

async function verifyHash(password,hashedPassword){
    try{
        const isValid= await bcrypt.compare(password,hashedPassword);
        return isValid;
    }
    catch(error){
        return new ApiError("Invalid credentials",400)
    }
}

module.exports={verifyHash,createHash}