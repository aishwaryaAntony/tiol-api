'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    createUniqueVerificationCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createOTP();
            let isExist = await _models2.default.User.findOne({
                where: {
                    verification_code: code
                }
            });
            if (isExist === null) {
                break;
            }
        }
        return code;
    },

    createOTP: async () => {
        return new Promise(async (resolve, reject) => {
            let characters = '123456790';
            let result = "";
            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            let code = result;
            resolve(code);
        });
    },

    createPassword: async length => {
        return new Promise(async (resolve, reject) => {
            let characters = 'aAcCdDeEgGhHjJkKlLmMnNpPqQrRsStTuUvVwWxXyYzZ2345679';
            let result = "";
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            let password = result;
            resolve(password);
        });
    }
};