import db from "../models";

exports.fetch_all_award_sub_categories = async (req, res, next) => {
    try {
        let fetchAllAwardSubCategories = await db.AwardSubCategory.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardSubCategories,
            message: 'AwardSubCategories fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_award_sub_categories method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching AwardSubCategory'
        });
    }
};

exports.fetch_all_award_sub_categories_by_season = async (req, res, next) => {
    try {
        const { category } = req.query;
        if(category === undefined || category === null || category === "" ){
            return res.status(200).json({
                status: 'success',
                payload: [],
                message: 'AwardSubCategories fetched successfully'
            });
        }

        let fetchCurrentAwardSeason = await db.AwardSeason.findOne({
            where: {
                status: 'ACTIVE'
            }
        });

        if(fetchCurrentAwardSeason === null){
            return res.status(200).json({
                status: 'failed',
                message: 'Error in award season'
            }); 
        }

        let fetchAwardCategory = await db.AwardCategory.findOne({
            where: {
                code: category
            }
        });

        if(fetchAwardCategory === null){
            return res.status(200).json({
                status: 'failed',
                message: 'Error in award season'
            }); 
        }

        let fetchAllAwardSubCategories = await db.AwardSubCategory.findAll({
            where: {
                award_season_id: fetchCurrentAwardSeason.id,
                award_category_id: fetchAwardCategory.id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllAwardSubCategories,
            message: 'AwardSubCategories fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_award_sub_categories method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching AwardSubCategory'
        });
    }
};

exports.fetch_award_sub_categories_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetchAwardSubCategory = await db.AwardSubCategory.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.AwardSurveyQuestion,
                as: 'awardSurveyQuestions',
                include: [{
                    model: db.AwardSurveyOption,
                    as: 'awardSurveyOptions',
                }]
            }]
        });
        if (fetchAwardSubCategory === null) {
            return res.status(200).json({
                status: 'success',
                payload: null,
                message: 'AwardSubCategory not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: fetchAwardSubCategory,
            message: 'AwardSubCategory id fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_award_sub_categories_by_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error in fetch AwardSubCategory by id'
        });
    }
};

exports.create_new_award_sub_category = async (req, res, next) => {
    try {
        let { award_season_id, award_category_id, code, name, description, status } = req.body;

        let fetchAwardSeason = await db.AwardSeason.findOne({
            where: {
                id: award_season_id
            }
        });
        if (fetchAwardSeason === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'Award Season not found'
            })
        };
        let fetchAwardCategory = await db.AwardCategory.findOne({
            where: {
                id: award_category_id,
                award_season_id: award_season_id
            }
        });
        if (fetchAwardCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'Award Category not found'
            })
        };
        let fetchAwardSubCategory = await db.AwardSubCategory.findOne({
            where: {
                code: code
            }
        });
        if (fetchAwardSubCategory === null) {
            let new_awardSubCategory = await db.AwardSubCategory.create({
                award_season_id,
                award_category_id,
                code,
                name,
                description,
                status
            });
            return res.status(200).json({
                status: 'success',
                payload: new_awardSubCategory,
                message: 'AwardSubCategory created successfully'
            });
        } else {
            return res.status(500).json({
                status: 'failed',
                payload: null,
                message: 'Award Sub Category not found'
            })
        }
    }
    catch (error) {
        console.log("Error at create_new_award_sub_category method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating a AwardSubCategory'
        });
    }
};

exports.update_award_sub_category = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { award_season_id, award_category_id, code, name, description, status } = req.body;

        let fetchAwardSubCategory = await db.AwardSubCategory.findOne({
            where: {
                id: id
            }
        });
        if (fetchAwardSubCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'AwardCategory not found'
            });
        }
        await db.AwardSubCategory.update({
            /*
                code will be autogenerated now used only for testing purpose
            */
            code: code ? code : fetchAwardSubCategory.code,
            name: name ? name : fetchAwardSubCategory.name,
            description: description ? description : fetchAwardSubCategory.description,
            status: status ? status : fetchAwardSubCategory.status
        }, {
            where: {
                id: id
            }
        });
        let updatedAwardSubCategory = await db.AwardSubCategory.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedAwardSubCategory,
            message: 'AwardSubCategory updated successfully'
        });
    }
    catch (error) {
        console.log("Error at update_award_sub_category method- POST / :" + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating AwardSubCategory'
        });
    }
};