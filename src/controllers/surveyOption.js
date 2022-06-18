import db from "../models";

exports.fetch_all_surveyOptions = async (req, res, next) => {
    try {
        let fetchAllSurveyOptions = await db.SurveyOption.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllSurveyOptions,
            message: 'SurveyOptions fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at SurveyOptions method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while  fetched SurveyOptions'
        });
    }
}

exports.fetch_surveyOption_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findSurveyOption = await db.SurveyOption.findOne({
            where: {
                id: id
            }
        });
        if (findSurveyOption === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid SurveyOption'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findSurveyOption,
            message: 'SurveyOption fetched  by id successfully'
        });

    }
    catch (error) {
        console.log("Error at SurveyOption  By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetched  by id SurveyOption'
        });
    }
}

exports.create_new_surveyOption = async (req, res, next) => {
    try {
        let { survey_question_id, answer, weightage, status } = req.body;

        let findSurveyQuestion = await db.SurveyQuestion.findOne({
            where: {
                id: survey_question_id
            }
        });
        if (findSurveyQuestion === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid SurveyOption'
            });
        }
        let new_surveyOption = await db.SurveyOption.create({
            survey_question_id,
            answer,
            weightage,
            status
        })

        res.status(200).json({
            status: 'success',
            payload: new_surveyOption,
            message: 'SurveyOption created successfully'
        });

    }
    catch (error) {
        console.log("Error at SurveyOption  By Id method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while create a SurveyOption'
        });
    }
}

exports.update_surveyOption = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { survey_question_id, answer, weightage, status } = req.body;

        let findSurveyOption = await db.SurveyOption.findOne({
            where: {
                id: id
            }
        });
        if (findSurveyOption === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid SurveyQuestion'
            });
        }
        await db.SurveyOption.update({
            survey_question_id: survey_question_id ? survey_question_id : findSurveyOption.survey_question_id,
            answer: answer ? answer : findSurveyOption.answer,
            weightage: weightage ? weightage : findSurveyOption.weightage,
            status: status ? status : findSurveyOption.status
        }, {
            where: {
                id: id
            }
        });

        let updatedSurveyOption = await db.SurveyOption.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedSurveyOption,
            message: 'SurveyOption updated successfully'
        });

    }
    catch (error) {
        console.log("Error at SurveyOption  By Id method- PUT / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updated SurveyOption'
        });
    }
}
