const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Please Enter your name'],
        maxLength: [30, "Your name cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail, 'Please enter valid email address']  //check that it is email or not

    },
    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default: 'user'
    },
    createAt:{
        type:String,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date 
})


//Encrypting password before saving user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){  // it make sure that password is changed
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPasword){
    return await bcrypt.compare(enteredPasword, this.password)
}

//return JWT token 
userSchema.methods.getJwtToken= function(){

    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generate password reset token 
userSchema.methods.getResetPasswordToken = function(){
    // Generate token 
    const resetToken  = crypto.randomBytes(20).toString('hex');

    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time
    this.resetPasswordExpire = Date.now() + 60 * 60 * 1000  //30 min

    return resetToken;


}

module.exports = mongoose.model('User', userSchema);