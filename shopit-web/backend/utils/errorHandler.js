// Error Handler class
// we using ineritence here and Error is parent class in this case
class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor) 
    }
}


module.exports= ErrorHandler;
