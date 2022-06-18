"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Op } = require("sequelize");

exports.fetch_all_nominee_application = async (req, res, next) => {
    try {
        let fetchAllNomineeApplication = await _models2.default.NomineeApplication.findAll({
            include: [{
                model: _models2.default.AwardSeason,
                as: 'awardSeason'
            }, {
                model: _models2.default.NomineeApplicationSurvey,
                as: 'nomineeApplicationSurveys',
                include: [{
                    model: _models2.default.AwardSurveyQuestion,
                    as: 'awardSurveyQuestion'
                }]
            }]
        });
        res.status(200).json({
            status: 'success',
            payload: fetchAllNomineeApplication,
            message: 'NomineeApplications fetched successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplications method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplications'
        });
    }
};

exports.fetch_nominee_application_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findNomineeApplication = await _models2.default.NomineeApplication.findOne({
            where: {
                id: id
            },
            include: [{
                model: _models2.default.AwardSeason,
                as: 'awardSeason'
            }, {
                model: _models2.default.NomineeApplicationSurvey,
                as: 'nomineeApplicationSurveys',
                include: [{
                    model: _models2.default.AwardSurveyQuestion,
                    as: 'awardSurveyQuestion'
                }, {
                    model: _models2.default.AwardSurveyOption,
                    as: 'awardSurveyOption'
                }]
            }]

        });
        if (findNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findNomineeApplication,
            message: 'NomineeApplication fetched by id successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplication By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplication by id'
        });
    }
};

exports.create_new_nominee_application = async (req, res, next) => {
    try {
        let { award_season_id, award_sub_category_id, nominator_ref, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status } = req.body;

        // let findNomineeApplication = await db.AwardSeason.findOne({
        //     where: {
        //         id: award_season_id
        //     }
        // })
        // console.log("=============>findNomineeApplication" + JSON.stringify(findNomineeApplication))
        // if (findNomineeApplication === null) {
        //     return res.status(200).json({
        //         status: 'failed',
        //         payload: null,
        //         message: 'Invalid NomineeApplication'
        //     });
        // }

        // let findSubCategory = await db.AwardSubCategory.findOne({
        //     where: {
        //         id: award_sub_category_id
        //     }
        // })

        // if (findSubCategory === null) {
        //     return res.status(200).json({
        //         status: 'success',
        //         payload: null,
        //         message: 'Invalid SubCategory'
        //     });
        // }

        let new_nomineeApplication = await _models2.default.NomineeApplication.create({
            award_season_id,
            award_sub_category_id,
            nominator_ref,
            nominee_name,
            email,
            nominee_contact_number,
            pan_number,
            company_name,
            state,
            city,
            postal_address,
            pin_code,
            industry_type,
            nominee_business,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_nomineeApplication,
            message: 'NomineeApplication created successfully'
        });
    } catch (error) {
        console.log("Error at create new nomineeApplication method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating nomineeApplication'
        });
    }
};

exports.update_nominee_application = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status } = req.body;

        let findNomineeApplication = await _models2.default.NomineeApplication.findOne({
            where: {
                id: id
            }
        });
        if (findNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        await _models2.default.NomineeApplication.update({
            award_season_id: award_season_id ? award_season_id : findNomineeApplication.award_season_id,
            award_sub_category_id: award_sub_category_id ? award_sub_category_id : findNomineeApplication.award_sub_category_id,
            nominee_name: nominee_name ? nominee_name : findNomineeApplication.nominee_name,
            email: email ? email : findNomineeApplication.email,
            nominee_contact_number: nominee_contact_number ? nominee_contact_number : findNomineeApplication.nominee_contact_number,
            pan_number: pan_number ? pan_number : findNomineeApplication.pan_number,
            company_name: company_name ? company_name : findNomineeApplication.company_name,
            state: state ? state : findNomineeApplication.state,
            city: city ? city : findNomineeApplication.city,
            postal_address: postal_address ? postal_address : findNomineeApplication.postal_address,
            industry_type: industry_type ? industry_type : findNomineeApplication.industry_type,
            nominee_business: nominee_business ? nominee_business : findNomineeApplication.nominee_business,
            status: status ? status : findNomineeApplication.status
        }, {
            where: {
                id: id
            }
        });
        let updatedNomineeApplication = await _models2.default.NomineeApplication.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedNomineeApplication,
            message: 'NomineeApplication updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating NomineeApplication'
        });
    }
};

exports.find_or_create_new_nominee_application = async (req, res, next) => {
    try {
        let { award_season_id, award_sub_category_id, nominator_ref, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status } = req.body;

        let [new_nomineeApplication, created] = await _models2.default.NomineeApplication.findOrCreate({
            where: {
                award_season_id,
                nominator_ref,
                award_sub_category_id,
                nominee_name
            },
            defaults: {
                award_season_id,
                award_sub_category_id,
                nominator_ref,
                nominee_name,
                email,
                nominee_contact_number,
                pan_number,
                company_name,
                state,
                city,
                postal_address,
                pin_code,
                industry_type,
                nominee_business,
                status: "DRAFT"
            }
        });
        res.status(200).json({
            status: 'success',
            payload: new_nomineeApplication,
            message: 'NomineeApplication created successfully'
        });
    } catch (error) {
        console.log("Error at find/create new nomineeApplication method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating nomineeApplication in find/create method'
        });
    }
};

exports.fetch_all_nominee_application_by_user_id = async (req, res, next) => {
    try {
        let id = parseInt(req.userData.user_id);

        let findNomineeApplications = await _models2.default.NomineeApplication.findAll({
            where: {
                [Op.or]: [{ nominator_ref: id }, { user_profile_ref: id }]
            }
        });
        res.status(200).json({
            status: 'success',
            payload: findNomineeApplications,
            message: 'NomineeApplications fetched by user_id successfully'
        });
    } catch (error) {
        console.log("Error at NomineeApplications By user_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplications by user_id'
        });
    }
};