const nodemailer = require('nodemailer');

import { TIOL_EMAIL, TIOL_PASS } from "../helpers/constants";

// create reusable ViewOption for member email template
module.exports.ViewOption = (transport, hbs) => {
    transport.use('compile', hbs({
        viewEngine: {
            extName: '.html',
            partialsDir: 'src/views',
            layoutsDir: 'src/views',
            defaultLayout: false,
        },
        viewPath: 'src/views',
        extName: '.html'
    }));
}

module.exports.GmailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: TIOL_EMAIL,
        pass: TIOL_PASS
    }
});