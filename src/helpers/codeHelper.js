import db from '../models';

module.exports = {
    createUniqueSurveyQuestionCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(6);
            let isExist = await db.SurveyQuestion.findOne({
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

    createCode: async (length) => {
        return new Promise(async (resolve, reject) => {
            let characters = 'ACDEGHJKLMNPQRSTUVWXYZ2345679';
            let result = "";
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length))
            }
            let code = result ;
            resolve(code)
        })
    },

    createUniqueMasterCategoryCode: async () => {
        let code = "";
        while (true) {
            code = await module.exports.createCode(4);
            let isExist = await db.MasterCategory.findOne({
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
            let isExist = await db.IndustryType.findOne({
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
            let isExist = await db.MasterSubCategory.findOne({
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
}