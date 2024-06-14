const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
// require('dotenv').config()

const dotenv = require('dotenv');
//dotenv.config({path:'./config/config.env'})
dotenv.config({ path: require('find-config')('.env') })

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    // const { token } = req.cookies
    const token = await req.headers.authorization.replace("Bearer ", "");
    if (!token ||token.length<1|| token===null) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findById(decoded.id);
    next();
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}


