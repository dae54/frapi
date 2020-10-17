const nodemailer = require('nodemailer')
const emailBody = require('./email')
module.exports = async function sendEmail(firstName, lastName, email, resetPasswordID) {
    try {
        const name = firstName.toUpperCase() + ' ' + lastName.toUpperCase()
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,//SENDER EMAIL
                pass: process.env.EMAIL_PASSWORD//SENDER PASSWORD
            }
        });

        const response = await transporter.sendMail({
            from: '"Fund Request (ipfsoftwares)👻" <danielernest1.05@gmail.com>', // sender address
            // to: email, //receivers
            to:'amethysternest@gmail.com',
            subject: 'Test Invitation ✔', // Subject
            html: emailBody(name, resetPasswordID) // html body
        });
        return { status: true, message: 'sent successful' }
    } catch (error) {
        return { status: false, message: error.message }
    }
}