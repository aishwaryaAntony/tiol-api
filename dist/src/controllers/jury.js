"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _attachmentServices = require("../utils/attachmentServices");

var _constants = require("../helpers/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.get_all_jury = async (req, res, next) => {

    try {
        let fetchAllJury = await _models2.default.Jury.findAll({});
        res.status(200).json({
            status: "success",
            payload: fetchAllJury,
            message: "Jury fetched successfully"
        });
    } catch (error) {
        console.log("Error at Jury get method - GET / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};

exports.get_jury_by_id = async (req, res, next) => {

    try {
        const { id } = req.params;
        let fetchJury = await _models2.default.Jury.findOne({
            where: {
                id: id
            }
        });
        if (fetchJury === null) {
            res.status(500).json({
                status: "failed",
                payload: {},
                message: error
            });
        } else {
            res.status(200).json({
                status: "success",
                payload: fetchJury,
                message: "Jury fetch successfully"
            });
        }
    } catch (error) {
        console.log("Error at Jury get method by id - GET / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};

exports.insert_jury = async (req, res, next) => {

    try {
        const { user_profile_id, description, designation, status } = req.body;

        let newJury = await _models2.default.Jury.create({
            user_profile_id, description, designation, status
        });
        if (req.file !== undefined) {
            await (0, _attachmentServices.addAttachment)(req.file, _constants.JURIES_BUCKET_NAME, newJury.id, null);
            newJury = await _models2.default.Jury.findOne({ where: { id: newJury.id } });
        }
        res.status(200).json({
            status: "success",
            payload: newJury,
            message: "Jury created successfully"
        });
    } catch (error) {
        console.log("Error at Jury post method - POST / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};

exports.update_jury_by_id = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { user_profile_id, description, designation, file_name, mongo_id, status } = req.body;

        let fetchJury = await _models2.default.Jury.findOne({
            where: {
                id: id
            }
        });
        if (fetchJury === null) {
            res.status(500).json({
                status: "failed",
                payload: {},
                message: 'Jury not found'
            });
        } else {
            let updatedJury = await _models2.default.Jury.update({
                user_profile_id: user_profile_id !== undefined ? user_profile_id : fetchJury.user_profile_id,
                description: description !== undefined ? description : fetchJury.description,
                designation: designation !== undefined ? designation : fetchJury.designation,
                file_name: file_name !== undefined ? file_name : fetchJury.file_name,
                mongo_id: mongo_id !== undefined ? mongo_id : fetchJury.mongo_id,
                status: status !== undefined ? status : fetchJury.status
            }, {
                where: {
                    id: fetchJury.id
                },
                returning: true
            });
            let fetchUpdatedJury = updatedJury[1].length > 0 ? updatedJury[1][0] : null;

            if (fetchUpdatedJury !== null) {
                if (req.file !== undefined) {
                    if (fetchUpdatedJury.mongo_id !== null) {
                        await (0, _attachmentServices.deleteAttachment)(fetchUpdatedJury.mongo_id, _constants.JURIES_BUCKET_NAME);
                    }
                    await (0, _attachmentServices.addAttachment)(req.file, _constants.JURIES_BUCKET_NAME, fetchUpdatedJury.id, null);
                }
                fetchUpdatedJury = await _models2.default.Jury.findOne({ where: { id: fetchUpdatedJury.id } });
                res.status(200).json({
                    status: 'success',
                    payload: fetchUpdatedJury,
                    message: 'Jury updated successfully'
                });
            } else {
                res.status(500).json({
                    status: 'failed',
                    message: 'Error while updating Jury'
                });
            }
        }
    } catch (error) {
        console.log("Error at Jury put method - PUT / : " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: error
        });
    }
};