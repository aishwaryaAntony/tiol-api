'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_nominee_application_survey = async (req, res, next) => {
    try {
        let fetchAllNomineeApplicationSurveys = await _models2.default.NomineeApplicationSurvey.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllNomineeApplicationSurveys,
            message: 'NomineeApplicationSurveys fetched successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplicationSurveys method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetched NomineeApplicationSurveys'
        });
    }
};

exports.fetch_nominee_application_survey_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetchNomineeApplicationSurvey = await _models2.default.NomineeApplicationSurvey.findOne({
            where: {
                id: id
            }
        });
        if (fetchNomineeApplicationSurvey === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplicationSurvey not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: fetchNomineeApplicationSurvey,
            message: 'NomineeApplicationSurvey fetched by id successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplicationSurvey By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching nomineeApplicationSurvey by id'
        });
    }
};

exports.create_new_nominee_application_survey = async (req, res, next) => {
    try {
        let { nominee_application_id, award_survey_question_id, award_survey_option_id, status } = req.body;

        let fetchNomineeApplication = await _models2.default.NomineeApplication.findOne({
            where: {
                id: nominee_application_id
            }
        });
        if (fetchNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        let new_nominee_application_survey = await _models2.default.NomineeApplicationSurvey.create({
            nominee_application_id,
            award_survey_question_id,
            award_survey_option_id,
            status: "ACTIVE"
        });

        res.status(200).json({
            status: 'success',
            payload: new_nominee_application_survey,
            message: 'NomineeApplicationSurvey created successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplicationSurvey method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating NomineeApplicationSurvey'
        });
    }
};

exports.bulk_create_nominee_application_survey = async (req, res, next) => {
    try {
        const { nominee_application_id, questionOptions } = req.body;

        let fetchNomineeApplication = await _models2.default.NomineeApplication.findOne({
            where: {
                id: nominee_application_id
            }
        });
        if (fetchNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        } else {
            let fetchNomineeApplicationSurvey = await _models2.default.NomineeApplicationSurvey.count({
                where: { nominee_application_id: nominee_application_id }
            });
            if (fetchNomineeApplicationSurvey > 0) {
                for (let question in questionOptions) {
                    await _models2.default.NomineeApplicationSurvey.update({
                        award_survey_option_id: parseInt(questionOptions[question]),
                        status: "ACTIVE"
                    }, {
                        where: {
                            nominee_application_id,
                            award_survey_question_id: parseInt(question)
                        }
                    });
                }
            } else {
                for (let question in questionOptions) {
                    await _models2.default.NomineeApplicationSurvey.create({
                        nominee_application_id,
                        award_survey_question_id: parseInt(question),
                        award_survey_option_id: parseInt(questionOptions[question]),
                        status: "ACTIVE"
                    });
                }
            }
            let bulkNomineeApplicationSurveys = await _models2.default.NomineeApplicationSurvey.findAll({
                where: {
                    nominee_application_id: fetchNomineeApplication.id
                }
            });
            res.status(200).json({
                status: 'success',
                payload: bulkNomineeApplicationSurveys,
                message: 'Bulk NomineeApplicationSurvey created successfully'
            });
        }
    } catch (error) {
        console.log("Error at bulk creating NomineeApplicationSurvey method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while bulk creating NomineeApplicationSurvey'
        });
    }
};