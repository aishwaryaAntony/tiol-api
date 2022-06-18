import db from "../models";
import { createUniqueMasterCategoryCode } from "../helpers/codeHelper";

exports.fetch_all_master_category = async (req, res, next) => {
    try {
        let fetchAllMasterCategories = await db.MasterCategory.findAll({
            include:[{
                model: db.MasterSubCategory,
                as: "masterSubCategories"
            }]
        });

        res.status(200).json({
            status: 'success',
            payload: fetchAllMasterCategories,
            message: 'MasterCategories fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at MasterCategories method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching MasterCategories'
        });
    }
}
exports.fetch_master_category_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findMasterCategory = await db.MasterCategory.findOne({
            where: {
                id: id
            }
        });

        if (findMasterCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterCategory not found'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: findMasterCategory,
            message: 'MasterCategory by id fetched successfully'
        });

    } catch (error) {
        console.log("Error at MasterCategory By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching MasterCategory by id'
        });
    }
};

exports.create_new_master_category = async (req, res, next) => {
    try {
        let { name, description, status } = req.body;
        const code = await createUniqueMasterCategoryCode();

        let newMasterCategory = await db.MasterCategory.create({
            name,
            code,
            description,
            status
        })

        res.status(200).json({
            status: 'success',
            payload: newMasterCategory,
            message: 'MasterCategory created successfully'
        });
    }
    catch (error) {
        console.log("Error at MasterCategory method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating masterCategory'
        });
    }

};

exports.update_master_category = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { name, description, status } = req.body;

        let findMasterCategory = await db.MasterCategory.findOne({
            where: {
                id: id
            }
        });

        if (findMasterCategory === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'MasterCategory not found'
            });
        }

        await db.MasterCategory.update({
            name: name ? name : findMasterCategory.name,
            description: description ? description : findMasterCategory.description,
            status: status ? status : findMasterCategory.status
        }, {
            where: {
                id: id
            }
        });

        let updatedMasterCategory = await db.MasterCategory.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: updatedMasterCategory,
            message: 'MasterCategory updated successfully'
        });
    }
    catch (error) {
        console.log("Error at MasterCategory method- PUT / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating masterCategory'
        });
    }
}