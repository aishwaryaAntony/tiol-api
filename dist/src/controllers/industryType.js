"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _codeHelper = require("../helpers/codeHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_industry_types = async (req, res, next) => {
    try {
        let fetchAllIndustryTypes = await _models2.default.IndustryType.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllIndustryTypes,
            message: 'IndustryTypes fetched successfully'
        });
    } catch (error) {
        console.log("Error at IndustryType method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching IndustryTypes'
        });
    }
};
exports.fetch_industry_type_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findIndustryType = await _models2.default.IndustryType.findOne({
            where: {
                id: id
            }
        });
        if (findIndustryType === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'Invalid IndustryType'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findIndustryType,
            message: 'IndustryType fetched by id successfully'
        });
    } catch (error) {
        console.log("Error at industryType By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching industryType by id'
        });
    }
};
exports.create_new_industry_type = async (req, res, next) => {
    try {
        let { name, status } = req.body;
        const code = await (0, _codeHelper.createUniqueIndustryTypeCode)();
        let new_industry_type = await _models2.default.IndustryType.create({
            name,
            code,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_industry_type,
            message: 'IndustryType created successfully'
        });
    } catch (error) {
        console.log("Error at industrytype method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating industryType'
        });
    }
};
exports.update_industry_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { name, code, status } = req.body;

        let findIndustryType = await _models2.default.IndustryType.findOne({
            where: {
                id: id
            }
        });

        if (findIndustryType === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'Invalid IndustryType'
            });
        }

        await _models2.default.IndustryType.update({
            name: name ? name : findIndustryType.name,
            code: code ? code : findIndustryType.code,
            status: status ? status : findIndustryType.status
        }, {
            where: {
                id: id
            }
        });

        let updatedIndustryType = await _models2.default.IndustryType.findOne({
            where: {
                id: findIndustryType.id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: updatedIndustryType,
            message: 'IndustryType updated successfully'
        });
    } catch (error) {
        console.log("Error at industrytype method- PUT / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating industryType'
        });
    }
};