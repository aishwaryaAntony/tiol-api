import db from "../models";
const sequelize = require('sequelize');

exports.fetch_all_award_seasons = async (req, res, next) => {
    try {
        let fetchAllAwardSeasons = await db.AwardSeason.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardSeasons,
            message: 'AwardSeasons fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_award_seasons method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching AwardSeasons'
        });
    }
};

exports.fetch_current_award_season = async (req, res, next) => {
    try {
        let fetchCurrentAwardSeason;
        let fetchActiveAwardSeason = await db.AwardSeason.findOne({
            where: {
                status: 'ACTIVE'
            },
            include: [
                {
                    model: db.AwardCategory,
                    as: 'awardCategories',
                    include: [{
                        model: db.AwardSubCategory,
                    as: 'awardSubCategories',
                    }]
                }
            ]
        });
        if(fetchActiveAwardSeason !== null){
            fetchCurrentAwardSeason = fetchActiveAwardSeason;
        } else {
            let fetchLatestCompletedAwardSeason = await db.AwardSeason.findAll({
                where: {
                    status: 'COMPLETED'
                },
                order: [[ 'updatedAt', 'DESC' ]],
                include: [
                    {
                        model: db.AwardCategory,
                        as: 'awardCategories',
                        include: [
                            {
                                model: db.AwardSubCategory,
                                as: 'awardSubCategories'
                            }
                        ]
                    }
                ]
            });            
            fetchCurrentAwardSeason = fetchLatestCompletedAwardSeason[0];
        } 
        res.status(200).json({
            status: 'success',
            payload: fetchCurrentAwardSeason,
            message: 'Current AwardSeason fetched successfully'
        });    
    }
    catch (error) {
        console.log("Error at fetch_current_award_season method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching current AwardSeason'
        });
    }
};

exports.fetch_award_season_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findAwardSeason = await db.AwardSeason.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.AwardCategory,
                as: 'awardCategories',
                include: [{
                    model: db.AwardSubCategory,
                    as: 'awardSubCategories',
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

    }
    catch (error) {
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
        let { event_name, description, event_date, status } = req.body;

        let count = await db.AwardSeason.count({
            where: sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('createdAt')), '=', new Date().getFullYear())
        });

        let code = `TIOL${new Date().getFullYear()}-E${count + 1}`;

        let new_awardSeason = await db.AwardSeason.create({
            event_name,
            code,
            description,
            event_date,
            status
        })
        res.status(200).json({
            status: 'success',
            payload: new_awardSeason,
            message: 'AwardSeason created successfully'
        });
    }
    catch (error) {
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

        let { event_name, description, event_date, status } = req.body;

        let findAwardSeason = await db.AwardSeason.findOne({
            where: {
                id: id
            }
        });
        if (findAwardSeason === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'AwardSeason not found'
            });
        }

        let checkAwardSeasonStatus = await db.AwardSeason.findOne({
            where: {
                status: ["ACTIVE"]
            }
        });

        if (checkAwardSeasonStatus !== null) {
            if (checkAwardSeasonStatus.id === findAwardSeason.id) {
                await db.AwardSeason.update({
                    event_name: event_name ? event_name : findAwardSeason.event_name,
                    description: description ? description : findAwardSeason.description,
                    event_date: event_date ? event_date : findAwardSeason.event_date,
                    status: status ? status : findAwardSeason.status
                }, {
                    where: {
                        id: checkAwardSeasonStatus.id
                    }
                });
                let updatedAwardSeason = await db.AwardSeason.findOne({
                    where: {
                        id: findAwardSeason.id
                    }
                });
                res.status(200).json({
                    status: 'success',
                    payload: updatedAwardSeason,
                    message: 'AwardSeason updated successfully'
                });
            } else{
                await db.AwardSeason.update({
                    event_name: event_name ? event_name : findAwardSeason.event_name,
                    description: description ? description : findAwardSeason.description,
                    event_date: event_date ? event_date : findAwardSeason.event_date
                }, {
                    where: {
                        id: findAwardSeason.id
                    }
                });
                let updatedAwardSeason = await db.AwardSeason.findOne({
                    where: {
                        id: findAwardSeason.id
                    }
                });
                res.status(200).json({
                    status: 'success',
                    payload: updatedAwardSeason,
                    message: "Award season updated successfully, without its status"
                });
            }
        } else {
            await db.AwardSeason.update({
                event_name: event_name ? event_name : findAwardSeason.event_name,
                description: description ? description : findAwardSeason.description,
                event_date: event_date ? event_date : findAwardSeason.event_date,
                status: status ? status : findAwardSeason.status
            }, {
                where: {
                    id: findAwardSeason.id
                }
            });
            let updatedAwardSeason = await db.AwardSeason.findOne({
                where: {
                    id: findAwardSeason.id
                }
            });
            res.status(200).json({
                status: 'success',
                payload: updatedAwardSeason,
                message: 'AwardSeason updated successfully'
            });
        }
    }
    catch (error) {
        console.log("Error at update_award_season method- PUT / :" + error);
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

        let findAwardSeason = await db.AwardSeason.findOne({
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

        let findMasterCategories = await db.MasterCategory.findAll({
            where: {
                id: award_category_id
            }
        });

        for (let masterCategories of findMasterCategories) {
            let findAwardCategory = await db.AwardCategory.findOne({
                where: {
                    master_category_ref: masterCategories.id,
                    award_season_id: award_season_id,
                    code: masterCategories.code,
                }
            })

            let awardCategory = null;
            if (findAwardCategory === null) {
                awardCategory = await db.AwardCategory.create({
                    master_category_ref: masterCategories.id,
                    award_season_id: award_season_id,
                    code: masterCategories.code,
                    name: masterCategories.name,
                    description: masterCategories.description,
                    status: "ACTIVE"
                });
            } else {
                awardCategory = findAwardCategory
            }

            if (awardCategory !== null) {

                let findMasterSubCategories = await db.MasterSubCategory.findAll({
                    where: {
                        id: award_sub_category_id,
                        master_category_id: masterCategories.id
                    }
                });

                for (let subCategories of findMasterSubCategories) {

                    let findAwardSubCategory = await db.AwardSubCategory.findOne({
                        where: {
                            master_sub_category_ref: subCategories.id,
                            award_season_id: award_season_id,
                            award_category_id: awardCategory.id,
                            code: subCategories.code,
                        }
                    });

                    if (findAwardSubCategory === null) {
                        await db.AwardSubCategory.create({
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
    }
    catch (error) {
        console.log("Error at Award Season Categories Config- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while Award Season Categories Config'
        });
    }
};
