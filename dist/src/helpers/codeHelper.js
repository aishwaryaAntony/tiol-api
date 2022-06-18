'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    createUniqueSurveyQuestionCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(6);
            let isExist = await _models2.default.SurveyQuestion.findOne({
                where: {
                    code: code
                }
            });
            if (isExist === null) {
                break;
            }
        }
        return code;
    },

    createCode: async length => {
        return new Promise(async (resolve, reject) => {
            let characters = 'ACDEGHJKLMNPQRSTUVWXYZ2345679';
            let result = "";
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            let code = result;
            resolve(code);
        });
    },

    createUniqueMasterCategoryCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(4);
            let isExist = await _models2.default.MasterCategory.findOne({
                where: {
                    code: code
                }
            });
            if (isExist === null) {
                break;
            }
        }
        return code;
    },

    createUniqueIndustryTypeCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(4);
            let isExist = await _models2.default.IndustryType.findOne({
                where: {
                    code: code
                }
            });
            if (isExist === null) {
                break;
            }
        }
        return code;
    },

    createUniqueMasterSubCategoryCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(6);
            let isExist = await _models2.default.MasterSubCategory.findOne({
                where: {
                    code: code
                }
            });
            if (isExist === null) {
                break;
            }
        }
        return code;
    }
};