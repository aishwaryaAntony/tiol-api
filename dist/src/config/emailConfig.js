'use strict';

var _constants = require('../helpers/constants');

const nodemailer = require('nodemailer');

// create reusable ViewOption for member email template
module.exports.ViewOption = (transport, hbs) => {
    transport.use('compile', hbs({
        viewEngine: {
            extName: '.html',
            partialsDir: 'src/views',
            layoutsDir: 'src/views',
            defaultLayout: false
        },
        viewPath: 'src/views',
        extName: '.html'
    }));
};

module.exports.GmailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: _constants.TIOL_EMAIL,
        pass: _constants.TIOL_PASS
    }
});