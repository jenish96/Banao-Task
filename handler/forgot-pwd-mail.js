const nodemailer = require('nodemailer');
const { response } = require('../routes');
require('dotenv').config();

const sendMail = (email, otp) => {

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is : ${otp}`
    };

    transport.sendMail(mailOptions, function (error, info) {
        return true;
    });
}

module.exports = sendMail 