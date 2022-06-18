import db from "../models";
import { createUniqueMasterSubCategoryCode } from "../helpers/codeHelper";

exports.fetch_all_masterSubCategories = async (req, res, next) => {
    try {
        let fetchAllMasterSubCategories = await db.MasterSubCategory.findAll({
            include:[
               {
                model:db.MasterCategory,
                as:'masterCategory'
               }
            ]
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllMasterSubCategories,
            message: 'MasterSubCategories fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at MasterSubCategories method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching MasterSubCategories'
        });
    }
}

exports.fetch_masterSubCategory_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findMasterSubCategory = await db.MasterSubCategory.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.SurveyQuestion,
                as: 'surveyQuestions',
                include: [{
                    model: db.SurveyOption,
                    as: 'surveyOptions',
                }]
            }]
        });
        if (findMasterSubCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterSubCategory not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findMasterSubCategory,
            message: 'MasterSubCategory fetched by id successfully'
        });

    }
    catch (error) {
        console.log("Error at MasterSubCategory  By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error in fetch by id MasterSubCategory'
        });
    }
}

exports.create_new_masterSubCategory = async (req, res, next) => {
    try {
        let { master_category_id, name, description, status } = req.body;
        const code = await createUniqueMasterSubCategoryCode();
        let findMasterCategory = await db.MasterCategory.findOne({
            where: {
                id: master_category_id
            }
        });

        if (findMasterCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterCategory not found'
            });
        }
        let new_masterSubCategory = await db.MasterSubCategory.create({
            master_category_id,
            code,
            name,
            description,
            status
        })
        res.status(200).json({
            status: 'success',
            payload: new_masterSubCategory,
            message: 'masterSubCategory created successfully'
        });

    }
    catch (error) {
        console.log("Error at MasterSubCategory  By  method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating a masterSubCategory'
        });
    }
}

exports.update_masterSubCategory = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { master_category_id, code, name, description, status } = req.body;

        let findMasterSubCategory = await db.MasterSubCategory.findOne({
            where: {
                id: id
            }
        });
        if (findMasterSubCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'masterSubCategory not found'
            });
        }
        await db.MasterSubCategory.update({
            master_category_id: master_category_id ? master_category_id : findMasterSubCategory.master_category_id,
            name: name ? name : findMasterSubCategory.name,
            code: code ? code : findMasterSubCategory.code,
            description: description ? description : findMasterSubCategory.description,
            status: status ? status : findMasterSubCategory.status
        }, {
            where: {
                id: id
            }
        });

        let updatedMasterSubCategory = await db.MasterSubCategory.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedMasterSubCategory,
            message: 'MasterSubCategory updated successfully'
        });

    }
    catch (error) {
        console.log("Error at MasterSubCategory  By  method- PUT / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating MasterSubCategory'
        });
    }
}