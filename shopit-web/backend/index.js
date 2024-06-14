const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
//dotenv.config({path:'./config/config.env'})
//setting up config file
dotenv.config({ path: require('find-config')('.env') })

//connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running at Port: ${process.env.PORT}`)
})