'use strict';

var _constants = require('../helpers/constants');

var path = require('path');
var MailConfig = require('../config/emailConfig');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;


// attachments for welcome template
var memberTemplateAttachments = [{
    filename: 'Logo.png',
    path: path.resolve(__dirname, '../views/logo.png'),
    cid: 'logo' //same cid value as in the html img src
}];

module.exports.send_mail = (template, toAddress, name, message) => {
    try {
        let subject = "";
        let attachments = [];
        let mailTemplate = "";

        // setup the config for dynamic template
        switch (template) {
            case "OTP":
                MailConfig.ViewOption(gmailTransport, hbs);
                subject = "Your Verification Code!";
                attachments = [...memberTemplateAttachments];
                mailTemplate = "otpTemplate";
                break;
            case "PWD":
                MailConfig.ViewOption(gmailTransport, hbs);
                subject = "Your Password!";
                attachments = [...memberTemplateAttachments];
                mailTemplate = "passwordTemplate";
                break;

            default:
                console.log("=====================>Invalid Template");
                break;
        }

        // setup e-mail data with unicode symbols
        let HelperOptions = {
            // from: '"TIOL Admin" <yuvaneshr@kenlasystems.com>',
            from: '"TIOL Admin"' + _constants.TIOL_EMAIL,
            to: toAddress,
            subject: subject,
            template: mailTemplate,
            context: {
                // message: message,
                name: name,
                message: message
            },
            attachments: attachments
        };
        // console.log("HelperOptions  ==> " + JSON.stringify(HelperOptions))
        if (mailTemplate !== "") {
            // send mail with defined transport object
            gmailTransport.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    console.log("===========error============");
                    console.log(error);
                    console.log("=======================");
                } else {
                    console.log("=======================>email is send");
                }
            });
        }
    } catch (ex) {
        console.log("error=====================>" + ex);
    }
};