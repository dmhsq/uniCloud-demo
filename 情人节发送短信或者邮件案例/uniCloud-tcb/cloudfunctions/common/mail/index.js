let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
     service: 'QQ', // no need to set host or port etc.
     auth: {
         user: 'xxxxxxxx',
         pass: 'xxxxxxxx'
     }
});

module.exports = transporter
