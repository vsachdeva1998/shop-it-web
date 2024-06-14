const dotenv = require('dotenv');
//dotenv.config({path:'./config/config.env'})
dotenv.config({ path: require('find-config')('.env') })

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async options=>{
  try{
    const sender = {
        email: process.env.SENDER_MAIL_ID,
        name:'ShopIT'
    }
      const sendEmail = await apiInstance.sendTransacEmail({
        sender,
        to: [{email: options.email}],
        subject:options.subject,
        textContent: options.message
    })
    console.log(sendEmail);
  }
  catch(error){
    console.log(error);
  }
  
}

module.exports = sendEmail;




// const nodemailer = require('nodemailer');
// const sendEmail = async options=>{
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//           user: process.env.SMTP_EMAIL,
//           pass: process.env.SMTP_PASSWORD
//         }
//       });

//       const message = {
//           from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}>`,
//           to: options.email,
//           subject: options.subject,
//           text: options.message
//       }

//       await transporter.sendMail(message)
// }

// module.exports = sendEmail;
