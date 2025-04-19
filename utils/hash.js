const bcrypt=require("bcrypt");
async function createHash(payload){
    try{
        const hashedPassword= await bcrypt.hash(payload,10);
        return hashedPassword;
    }
    catch(error){
        return false;
    }
}

async function verifyHash(password,hashedPassword){
    try{
        const isValid= await bcrypt.compare(password,hashedPassword);
        return isValid;
    }
    catch(error){
        return false;;
    }
}

module.exports={verifyHash,createHash}