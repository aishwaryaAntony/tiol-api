import db from "../models";
import Sequelize from "sequelize"

exports.fetch_all_selected_nominees = async (req, res, next) => {
    try {
        let fetchAllSelectedNominees = await db.SelectedNominee.findAll({
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.AwardSubCategory,
                    as: 'awardSubCategory'
                },
               
            ]
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllSelectedNominees,
            message: 'SelectedNominees fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_selected_nominees method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching Selected Nominees'
        });
    }
}

exports.fetch_all_selected_nominees_by_sub_category = async (req, res, next) => {
    try {
        const { seasonId, subCategoryId } = req.params;
        let fetchAllSelectedNominees = await db.SelectedNominee.findAll({
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.AwardSubCategory,
                    as: 'awardSubCategory'
                },
               
            ],
            where: {
                award_season_id: seasonId,
                award_sub_category_id: subCategoryId
            }
        });

        // console.log(`Nominees ==> ${JSON.stringify(fetchAllSelectedNominees)}`)

        res.status(200).json({
            status: 'success',
            payload: fetchAllSelectedNominees,
            message: 'SelectedNominees fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_selected_nominees method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching Selected Nominees'
        });
    }
}

exports.fetch_selected_nominee_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;
        let fetchSelectedNominee = await db.SelectedNominee.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.AwardSubCategory,
                    as: 'awardSubCategory'
                }
            ]
        });

        if (fetchSelectedNominee === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'SelectedNominee not found'
            });
        }

        let fetchVoterCount = await db.Voter.count({
            where: {
                selected_nominee_id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: fetchSelectedNominee,
            vote: fetchVoterCount,
            message: 'Selected Nominee fetched by id successfully'
        });
    }
    catch (error) {
        console.log("Error at selected Nominee By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching selected Nominee by id'
        });
    }
}

exports.fetch_selected_nominee_by_nomination_unique_id = async (req, res, next) => {
    try {
        let { nomination_unique_id } = req.params;
        let fetchSelectedNominee = await db.SelectedNominee.findOne({
            where: {
                nomination_unique_id: nomination_unique_id
            },
            include: [{
                model: db.AwardSubCategory,
                as: 'awardSubCategory',
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
    }
    catch (error) {
        console.log("Error at selected Nominee By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching selected Nominee by id'
        });
    }
}