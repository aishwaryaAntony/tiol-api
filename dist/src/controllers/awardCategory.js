"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_award_categories = async (req, res, next) => {
    try {
        let fetchAllAwardCategories = await _models2.default.AwardCategory.findAll({
            include: [{
                model: _models2.default.AwardSubCategory,
                as: "awardSubCategories"
            }]
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardCategories,
            message: 'AwardCategories fetched successfully'
        });
    } catch (error) {
        console.log("Error at fetch_all_award_categories method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching AwardCategories'
        });
    }
};

exports.fetch_award_category_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetchAwardCategory = await _models2.default.AwardCategory.findOne({
            where: {
                id: id
            }
        });
        if (fetchAwardCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardCategory not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: fetchAwardCategory,
            message: 'AwardCategory id fetched successfully'
        });
    } catch (error) {
        console.log("Error fetch_award_category_by_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error in fetch AwardCategory by id'
        });
    }
};

exports.create_new_award_category = async (req, res, next) => {
    try {
        let { award_season_id, code, name, description, status } = req.body;

        let findAwardCategory = await _models2.default.AwardSeason.findOne({
            where: {
                id: award_season_id
            }
        });
        if (findAwardCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardCategory not found'
            });
        }
        let new_awardCategory = await _models2.default.AwardCategory.create({
            award_season_id,
            code,
            name,
            description,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_awardCategory,
            message: 'AwardCategory created successfully'
        });
    } catch (error) {
        console.log("Error at create_new_award_category method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating AwardCategory'
        });
    }
};

exports.update_award_category = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { master_category_ref, award_season_id, code, name, description, status } = req.body;

        let fetchAwardCategory = await _models2.default.AwardCategory.findOne({
            where: {
                id: id
            }
        });
        if (fetchAwardCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardCategory not found'
            });
        }
        await _models2.default.AwardCategory.update({
            /*
            code will be autogenerated now used only for testing purpose
            */
            code: code ? code : fetchAwardCategory.code,
            name: name ? name : fetchAwardCategory.name,
            status: status ? status : fetchAwardCategory.status
        }, {
            where: {
                id: id
            }
        });
        let updatedAwardCategory = await _models2.default.AwardCategory.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: updatedAwardCategory,
            message: 'AwardCategory updated successfully'
        });
    } catch (error) {
        console.log("Error at update_award_category method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating AwardCategory'
        });
    }
};