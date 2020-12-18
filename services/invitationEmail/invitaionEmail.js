const nodemailer = require('nodemailer')
const emailBody = require('./testEmail1')
module.exports = async function sendEmail(firstName, lastName, email) {
    try {
        const name = firstName.toUpperCase() + ' ' + lastName.toUpperCase()
        const password = lastName.toUpperCase()
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOSTNAME,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });
        console.log(transporter)

        const response = await transporter.sendMail({
            from: 'amethysternest@gmail.com', // sender address
            to: email, //receivers
            subject: 'Test Invitation ✔', // Subject
            html: emailBody(name, email, password) // html body
        });
        console.log(response)

        return { status: true, message: 'Email sent successfully. ' }
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