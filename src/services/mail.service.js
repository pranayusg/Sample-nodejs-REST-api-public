const nodemailer = require('nodemailer');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('src/models/config.json'));

function sentMail(mssg) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.mailUsername,
            pass: config.mailPassword
        }
    });

    const mailOptions = {
        from: config.mailUsername,
        to: 'pranayu6@gmail.com',
        subject: 'Alert your API was accessed',
        text: mssg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('There is a error');
        } else {
            console.log('Email sent');
        }
    });
}

module.exports={sentMail}