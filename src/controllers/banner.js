import db from "../models";
import { BANNERS_BUCKET_NAME } from "../helpers/constants";
import { addAttachment, deleteAttachment } from "../utils/attachmentServices"

exports.fetch_all_banners = async (req, res, next) => {
    
    try {
        let fetchAllBanners = await db.Banner.findAll({});
        res.status(200).json({
            status: 'success',
            payload: fetchAllBanners,
            message: 'Banners fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_all_banners method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching banners'
        });
    }
};

exports.fetch_banner_by_id = async (req, res, next) => {
    
    try {
        let { id } = req.params;
        let fetchBanner = await db.Banner.findOne({
            where: {
                id: id
            }
        });                       
            res.status(200).json({
            status: 'success',
            payload: fetchBanner,
            message: 'Banners id fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at fetch_banner_by_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching banners by id'
        });
    }
};

exports.create_new_banner = async (req, res, next) => {
   
    try {
        const { banner_name, user_profile_id, status } = req.body;

        if (req.file !== undefined) {
            let newBanner = await db.Banner.create({
                banner_name,
                user_profile_id,
                status
            });

            await addAttachment(req.file, BANNERS_BUCKET_NAME, newBanner.id, null);
            newBanner = await db.Banner.findOne({ where: { id: newBanner.id } });

            return res.status(200).json({
                status: 'success',
                payload: newBanner,
                message: 'Banner created successfully'
            });
        } else {
            console.log('error at POST method file not found');
            res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'File not found in banner'
            });
        }
    }
    catch (error) {
        console.log("Error at POST method" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating banner'
        });
    }
};

exports.update_banner = async (req, res, next) => {
   
    try {
        const { id } = req.params;

        const { banner_name, user_profile_id, attachment_name, mongo_id, status } = req.body;

        let fetchBanner = await db.Banner.findOne({
            where: {
                id: id
            }
        });

        if (fetchBanner === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'Banner not found'
            });
        } else {
            let updatedBanner = await db.Banner.update({
                banner_name: banner_name ? banner_name : fetchBanner.banner_name,
                user_profile_id: user_profile_id ? user_profile_id : fetchBanner.user_profile_id,
                attachment_name: attachment_name ? attachment_name : fetchBanner.attachment_name,
                mongo_id: mongo_id ? mongo_id : fetchBanner.mongo_id,
                status: status ? status : fetchBanner.status
            }, {
                where: {
                    id: fetchBanner.id
                },
                returning: true
            });
            let fetchUpdatedBanner = updatedBanner[1].length > 0 ? (updatedBanner[1])[0] : null;
            
            if (fetchUpdatedBanner !== null) {
                if (req.file !== undefined) {
                    if (fetchUpdatedBanner.mongo_id !== null) {
                        await deleteAttachment(fetchUpdatedBanner.mongo_id, BANNERS_BUCKET_NAME);
                    }
                    await addAttachment(req.file, BANNERS_BUCKET_NAME, fetchUpdatedBanner.id, null);
                }
                fetchUpdatedBanner = await db.Banner.findOne({ where: { id: fetchUpdatedBanner.id } });
                return res.status(200).json({
                    status: 'success',
                    payload: fetchUpdatedBanner,
                    message: 'Banner updated successfully'
                });
            }else {
                console.log("Error at update method file not updated")
                    res.status(500).json({
                    status: 'failed',
                    message: 'Error while updating Banner'
                });
            }
        }       
    }
    catch (error) {
        console.log("Error at Banner put method - PUT / : " + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating banner'
        });
    }
};
