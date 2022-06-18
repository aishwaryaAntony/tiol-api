'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Op } = require('sequelize');
const _ = require('underscore');

exports.get_award_survey_question_by_award_season_id = async (req, res, next) => {
    try {
        const { award_season_id } = req.params;
        let fetchAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: award_season_id
            }
        });

        if (fetchAwardSeason === null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "AwardSeason not found"
            });
        }
        let fetchAwardSubCategory = await _models2.default.AwardSubCategory.findAll({
            where: {
                award_season_id: award_season_id
            },
            attributes: ["id"]
        });

        let awardSubCategoryIds = _.pluck(fetchAwardSubCategory, 'id');

        let fetchAwardSurveyQuestion = await _models2.default.AwardSurveyQuestion.findAll({
            where: {
                award_sub_category_id: {
                    [Op.in]: awardSubCategoryIds
                }
            },
            include: [{
                model: _models2.default.AwardSurveyOption,
                as: 'awardSurveyOptions'
            }]
        });
        res.status(200).json({
            status: "success",
            payload: fetchAwardSurveyQuestion,
            message: "AwardSurveyQuestion fetch successfully"
        });
    } catch (error) {
        console.log("Error at AwardSurveyQuestion get method by award_season_id - GET / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};

exports.create_new_award_survey_question = async (req, res, next) => {
    try {
        const { award_season_id, question_ids, award_sub_category_id } = req.body;

        let fetchAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: award_season_id
            }
        });

        if (fetchAwardSeason === null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "AwardSeason not found"
            });
        }

        let fetchAwardSubCategory = await _models2.default.AwardSubCategory.findOne({
            where: {
                id: award_sub_category_id
            }
        });

        if (fetchAwardSubCategory === null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "AwardSubCategory not found"
            });
        }
        let findMasterSurveyQuestions = await _models2.default.SurveyQuestion.findAll({
            where: {
                id: question_ids
            },
            include: [{
                model: _models2.default.SurveyOption,
                as: 'surveyOptions'
            }]
        });
        if (findMasterSurveyQuestions.length > 0) {
            for (let surveyQuestion of findMasterSurveyQuestions) {
                let findAwardSurveyQuestion = await _models2.default.AwardSurveyQuestion.findOne({
                    where: {
                        award_sub_category_id: award_sub_category_id,
                        code: surveyQuestion.code
                    }
                });

                let newAwardSurveyQuestion = null;

                if (findAwardSurveyQuestion === null) {
                    newAwardSurveyQuestion = await _models2.default.AwardSurveyQuestion.create({
                        award_sub_category_id: award_sub_category_id,
                        code: surveyQuestion.code,
                        question: surveyQuestion.question,
                        weightage: surveyQuestion.weightage,
                        is_required: surveyQuestion.is_required,
                        status: "ACTIVE"
                    });
                } else {
                    newAwardSurveyQuestion = findAwardSurveyQuestion;
                }

                if (surveyQuestion.surveyOptions.length > 0 && newAwardSurveyQuestion !== null) {
                    for (let surveyOptions of surveyQuestion.surveyOptions) {
                        let findAwardSurveyOption = await _models2.default.AwardSurveyOption.findOne({
                            where: {
                                award_survey_question_id: newAwardSurveyQuestion.id,
                                answer: surveyOptions.answer
                            }
                        });
                        if (findAwardSurveyOption === null) {
                            await _models2.default.AwardSurveyOption.create({
                                award_survey_question_id: newAwardSurveyQuestion.id,
                                answer: surveyOptions.answer,
                                weightage: surveyOptions.answer,
                                status: "ACTIVE"
                            });
                        }
                    }
                }
            }
        }

        res.status(200).json({
            status: "success",
            payload: null,
            message: "AwardSurveyQuestion fetch successfully"
        });
    } catch (error) {
        console.log("Error at AwardSurveyQuestion get method by award_season_id - GET / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};