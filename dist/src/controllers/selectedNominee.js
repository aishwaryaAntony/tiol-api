'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_selected_nominees = async (req, res, next) => {
    try {
        let fetchAllSelectedNominees = await _models2.default.SelectedNominee.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllSelectedNominees,
            message: 'SelectedNominees fetched successfully'
        });
    } catch (error) {
        console.log("Error at fetch_all_selected_nominees method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching Selected Nominees'
        });
    }
};

exports.fetch_selected_nominee_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;
        let fetchSelectedNominee = await _models2.default.SelectedNominee.findOne({
            where: {
                id: id
            },
            include: [{
                model: _models2.default.AwardSubCategory,
                as: 'awardSubCategory'
            }]
        });
        if (fetchSelectedNominee === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'SelectedNominee not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: fetchSelectedNominee,
            message: 'Selected Nominee fetched by id successfully'
        });
    } catch (error) {
        console.log("Error at selected Nominee By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching selected Nominee by id'
        });
    }
};