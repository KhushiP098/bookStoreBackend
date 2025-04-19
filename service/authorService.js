const ApiError = require("../utils/apiUtils/apiError");
const Author=require("../models/author")

const getAuthor=async(req)=>{

        const {authorId}=req.params;
        let query={};
        query._id=authorId;

        const allAuthors=await Author.find(...query);
        if(!allAuthors.length)throw new ApiError("No Author found!",404);
        return allAuthors;
}

const updateAuthor=async(req)=>{
        const {authorId}=req.params;
        const {authorName,imageUrl}=req.body;

        const existingAuthor=await Author.findById(authorId);
        if(!existingAuthor)throw new ApiError("No Author found",404);

        const updatedAuthorInfo=await Author.findOneAndUpdate({authorId},{authorName,imageUrl});
        return new ApiResponse("Author updated",updatedAuthorInfo); 
}

