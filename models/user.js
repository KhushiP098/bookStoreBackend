const  mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    },
    imageUrl:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
    otp:{
        type:String
    },
    booksPurchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }],
    isDeleted:{
        type:Date
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("User",userSchema);