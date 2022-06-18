import db from "../models";

exports.fetch_all_award_categories = async (req, res, next) => {
    try {
        let fetchAllAwardCategories = await db.AwardCategory.findAll({
            include: [
                {
                    model: db.AwardSubCategory,
                    as: "awardSubCategories",
                }
            ]
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardCategories,
            message: 'AwardCategories fetched successfully'
        });
    }
    catch (error) {
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

        let fetchAwardCategory = await db.AwardCategory.findOne({
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
    }
    catch (error) {
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

        let findAwardCategory = await db.AwardSeason.findOne({
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
        let new_awardCategory = await db.AwardCategory.create({
            award_season_id,
            code,
            name,
            description,
            status
        })
        res.status(200).json({
            status: 'success',
            payload: new_awardCategory,
            message: 'AwardCategory created successfully'
        });

    }

    catch (error) {
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

        let { master_category_ref, award_season_id, code, name, description, status, nomination_start_date, nomination_end_date, voting_start_date, voting_end_date} = req.body;

        let fetchAwardCategory = await db.AwardCategory.findOne({
            where: {
                id: id
            }
        });
        if (fetchAwardCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'AwardCategory not found'
            });
        }
        await db.AwardCategory.update({
            code: code ? code : fetchAwardCategory.code,
            name: name ? name : fetchAwardCategory.name,
            nomination_start_date: nomination_start_date ? nomination_start_date : fetchAwardCategory.nomination_start_date,
            nomination_end_date: nomination_end_date ? nomination_end_date : fetchAwardCategory.nomination_end_date,
            voting_start_date: voting_start_date ? voting_start_date : fetchAwardCategory.voting_start_date,
            voting_end_date: voting_end_date ? voting_end_date : fetchAwardCategory.voting_end_date,
            status: status ? status : fetchAwardCategory.status
        }, {
            where: {
                id: id
            }
        });
        let updatedAwardCategory = await db.AwardCategory.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: updatedAwardCategory,
            message: 'AwardCategory updated successfully'
        });
    }
    catch (error) {
        console.log("Error at update_award_category method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating AwardCategory'
        });
    }
};