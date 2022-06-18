"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _codeHelper = require("../helpers/codeHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_survey_question = async (req, res, next) => {
    try {
        let fetchAllSurveyQuestions = await _models2.default.SurveyQuestion.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllSurveyQuestions,
            message: 'SurveyQuestions fetched successfully'
        });
    } catch (error) {
        console.log("Error at SurveyQuestions method - GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching SurveyQuestions'
        });
    }
};

exports.fetch_survey_question_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findSurveyQuestion = await _models2.default.SurveyQuestion.findOne({
            where: {
                id: id
            },
            include: [{
                model: _models2.default.SurveyOption,
                as: 'surveyOptions'
            }]
        });
        if (findSurveyQuestion === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'SurveyQuestion not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findSurveyQuestion,
            message: 'SurveyQuestion fetched by id successfully'
        });
    } catch (error) {
        console.log("Error at SurveyQuestion By Id method - GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching SurveyQuestion by id'
        });
    }
};

exports.create_new_survey_question = async (req, res, next) => {
    try {
        let { master_sub_category_id, question, weightage, is_required, status } = req.body;
        const code = await (0, _codeHelper.createUniqueSurveyQuestionCode)();

        let findMasterSubCategory = await _models2.default.MasterSubCategory.findOne({
            where: {
                id: master_sub_category_id
            }
        });
        if (findMasterSubCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterSubCategory not found'
            });
        }
        let new_surveyQuestion = await _models2.default.SurveyQuestion.create({
            master_sub_category_id,
            code,
            question,
            weightage,
            is_required,
            status: "ACTIVE"
        });

        res.status(200).json({
            status: 'success',
            payload: new_surveyQuestion,
            message: 'SurveyQuestion created successfully'
        });
    } catch (error) {
        console.log("Error at SurveyQuestion method - POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while create a SurveyQuestion'
        });
    }
};

exports.update_survey_question = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { master_sub_category_id, code, question, weightage, is_required, status } = req.body;

        let findSurveyQuestion = await _models2.default.SurveyQuestion.findOne({
            where: {
                id: id
            }
        });
        if (findSurveyQuestion === null) {
            return res.status(200).json({
                status: 'failed',
                payload: {},
                message: 'SurveyQuestion not found'
            });
        }
        await _models2.default.SurveyQuestion.update({
            master_sub_category_id: master_sub_category_id ? master_sub_category_id : findSurveyQuestion.master_sub_category_id,
            question: question ? question : findSurveyQuestion.question,
            code: code ? code : findSurveyQuestion.code,
            weightage: weightage ? weightage : findSurveyQuestion.weightage,
            is_required: is_required ? is_required : findSurveyQuestion.is_required,
            status: status ? status : findSurveyQuestion.status
        }, {
            where: {
                id: id
            }
        });

        let updatedSurveyQuestion = await _models2.default.SurveyQuestion.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedSurveyQuestion,
            message: 'SurveyQuestion updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating SurveyQuestion'
        });
    }
};

exports.create_new_survey_question_with_options = async (req, res, next) => {
    try {
        let { master_sub_category_id, question, weightage, is_required, status, options } = req.body;
        const code = await (0, _codeHelper.createUniqueSurveyQuestionCode)();

        let findMasterSubCategory = await _models2.default.MasterSubCategory.findOne({
            where: {
                id: master_sub_category_id
            }
        });
        if (findMasterSubCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterSubCategory not found'
            });
        }

        let new_surveyQuestion = await _models2.default.SurveyQuestion.create({
            master_sub_category_id,
            code,
            question,
            weightage,
            is_required,
            status: "ACTIVE"
        });

        for (let option of options) {
            await _models2.default.SurveyOption.create({
                survey_question_id: new_surveyQuestion.id,
                answer: option.answer,
                weightage: option.weightage,
                status: "ACTIVE"
            });
        }
        res.status(200).json({
            status: 'success',
            payload: new_surveyQuestion,
            message: 'SurveyQuestion with options created successfully'
        });
    } catch (error) {
        console.log("Error at SurveyQuestion with options method - POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating SurveyQuestion with options'
        });
    }
};

exports.fetch_survey_question_by_master_sub_category_id = async (req, res, next) => {
    try {
        let { master_sub_category_id } = req.params;

        let findSurveyQuestion = await _models2.default.SurveyQuestion.findAll({
            where: {
                master_sub_category_id: master_sub_category_id
            },
            include: [{
                model: _models2.default.SurveyOption,
                as: 'surveyOptions'
            }]
        });
        if (findSurveyQuestion === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'SurveyQuestion not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findSurveyQuestion,
            message: 'SurveyQuestion fetched by master_sub_category_id successfully'
        });
    } catch (error) {
        console.log("Error at SurveyQuestion By master_sub_category_id method - GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching SurveyQuestion by master_sub_category_id'
        });
    }
};