'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = require('sequelize');

exports.fetch_all_award_seasons = async (req, res, next) => {
    try {
        let fetchAllAwardSeasons = await _models2.default.AwardSeason.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardSeasons,
            message: 'AwardSeasons fetched successfully'
        });
    } catch (error) {
        console.log("Error at fetch_all_award_seasons method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching AwardSeasons'
        });
    }
};

exports.fetch_award_season_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: id
            },
            include: [{
                model: _models2.default.AwardCategory,
                as: 'awardCategories',
                include: [{
                    model: _models2.default.AwardSubCategory,
                    as: 'awardSubCategories'
                }]
            }]
        });
        if (findAwardSeason === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardSeason not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findAwardSeason,
            message: 'AwardSeason id fetched successfully'
        });
    } catch (error) {
        console.log("Error at fetch_award_season_by_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error in fetch AwardSeason by id'
        });
    }
};

exports.create_new_award_season = async (req, res, next) => {
    try {
        let { event_name, description, nomination_start_date, nomination_end_date,
            voting_start_date, voting_end_date, event_date, status } = req.body;

        let count = await _models2.default.AwardSeason.count({
            where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')), '=', new Date().getFullYear())
        });

        let code = `TIOL${new Date().getFullYear()}-E${count + 1}`;

        let new_awardSeason = await _models2.default.AwardSeason.create({
            event_name,
            code,
            description,
            nomination_start_date,
            nomination_end_date,
            voting_start_date,
            voting_end_date,
            event_date,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_awardSeason,
            message: 'AwardSeason created successfully'
        });
    } catch (error) {
        console.log("Error at create_new_award_season method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating AwardSeason'
        });
    }
};

exports.update_award_season = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { event_name, description, nomination_start_date, nomination_end_date,
            voting_start_date, voting_end_date, event_date, status } = req.body;

        let findAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: id
            }
        });
        if (findAwardSeason === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardSeason not found'
            });
        }
        await _models2.default.AwardSeason.update({
            event_name: event_name ? event_name : findAwardSeason.event_name,
            description: description ? description : findAwardSeason.description,
            nomination_start_date: nomination_start_date ? nomination_start_date : findAwardSeason.nomination_start_date,
            nomination_end_date: nomination_end_date ? nomination_end_date : findAwardSeason.nomination_end_date,
            voting_start_date: voting_start_date ? voting_start_date : findAwardSeason.voting_start_date,
            voting_end_date: voting_end_date ? voting_end_date : findAwardSeason.voting_end_date,
            event_date: event_date ? event_date : findAwardSeason.event_date,
            status: status ? status : findAwardSeason.status
        }, {
            where: {
                id: id
            }
        });
        let updatedAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedAwardSeason,
            message: 'AwardSeason updated successfully'
        });
    } catch (error) {
        console.log("Error at update_award_season method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating AwardSeason'
        });
    }
};

exports.config_award_categories = async (req, res, next) => {
    try {
        let { award_season_id, award_category_id, award_sub_category_id } = req.body;

        let findAwardSeason = await _models2.default.AwardSeason.findOne({
            where: {
                id: award_season_id
            }
        });

        if (findAwardSeason === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'AwardSeason not found'
            });
        }

        let findMasterCategories = await _models2.default.MasterCategory.findAll({
            where: {
                id: award_category_id
            }
        });

        for (let masterCategories of findMasterCategories) {
            let findAwardCategory = await _models2.default.AwardCategory.findOne({
                where: {
                    master_category_ref: masterCategories.id,
                    award_season_id: award_season_id,
                    code: masterCategories.code
                }
            });

            let awardCategory = null;
            if (findAwardCategory === null) {
                awardCategory = await _models2.default.AwardCategory.create({
                    master_category_ref: masterCategories.id,
                    award_season_id: award_season_id,
                    code: masterCategories.code,
                    name: masterCategories.name,
                    description: masterCategories.description,
                    status: "ACTIVE"
                });
            } else {
                awardCategory = findAwardCategory;
            }

            if (awardCategory !== null) {

                let findMasterSubCategories = await _models2.default.MasterSubCategory.findAll({
                    where: {
                        id: award_sub_category_id,
                        master_category_id: masterCategories.id
                    }
                });

                for (let subCategories of findMasterSubCategories) {

                    let findAwardSubCategory = await _models2.default.AwardSubCategory.findOne({
                        where: {
                            master_sub_category_ref: subCategories.id,
                            award_season_id: award_season_id,
                            award_category_id: awardCategory.id,
                            code: subCategories.code
                        }
                    });

                    if (findAwardSubCategory === null) {
                        await _models2.default.AwardSubCategory.create({
                            master_sub_category_ref: subCategories.id,
                            award_season_id: award_season_id,
                            award_category_id: awardCategory.id,
                            code: subCategories.code,
                            name: subCategories.name,
                            description: subCategories.description,
                            status: "ACTIVE"
                        });
                    }
                }
            }
        }

        res.status(200).json({
            status: 'success',
            payload: null,
            message: 'Award Season Categories Config Successfully'
        });
    } catch (error) {
        console.log("Error at Award Season Categories Config- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while Award Season Categories Config'
        });
    }
};