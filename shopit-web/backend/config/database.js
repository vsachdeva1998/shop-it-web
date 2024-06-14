const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
    }).then(console.log("MongoDB Database Connected"));
}

module.exports = connectDatabase;