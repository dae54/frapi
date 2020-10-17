const nodemailer = require('nodemailer')
const emailBody = require('./testEmail1')
module.exports = async function sendEmail(firstName, lastName, email) {
    try {
        const name = firstName.toUpperCase() + ' ' + lastName.toUpperCase()
        const password = lastName.toUpperCase()
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,//SENDER EMAIL
                pass: process.env.EMAIL_PASSWORD//SENDER PASSWORD
            }
        });

        const response = await transporter.sendMail({
            from: '"Fund Request (ipfsoftwares)👻" <danielernest1.05@gmail.com>', // sender address
            to: email, //receivers
            subject: 'Test Invitation ✔', // Subject
            html: emailBody(name, email, password) // html body
        });
        return { status: true, message: 'sent successful' }
    } catch (error) {
        return { status: false, message: error.message }
    }

    // function (err, response, done) {
    //     if (err) {
    //         // console.log(err)
    //         // throw new Error (err)
    //         return done(Error)
    //     }
    //     console.log(response)
    //     return response.messageId
    // })
}