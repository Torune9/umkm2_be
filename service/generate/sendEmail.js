const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.HOSTNAME_MAILTRAP,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USERNAME_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP,
    },
  });

const sendEmail =  async (option) => {
    try {   
      const info = await transporter.sendMail({
        from: 'example@test.com',
        to: option.email,
        subject: option.message,
        text: option.url,
        html : option.layout
      });
      console.log("Message sent: %s", info.messageId)
    } catch (error) {
      console.error("Error sending email: ", error)
      throw error
    }
  }
  
  module.exports = sendEmail
  