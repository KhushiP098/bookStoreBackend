class ApiError extends Error{

    constructor(message,statusCode,){
        super(message);
        this.statusCode=statusCode;
        this.success=false;
    }
}

module.exports=ApiError;