const nodemailer = require('nodemailer');

function sentMail(mssg) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
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