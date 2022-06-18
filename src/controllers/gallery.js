import db from "../models";
import { GALLERIES_BUCKET_NAME } from "../helpers/constants";
import { addAttachment, deleteAttachment } from '../utils/attachmentServices';

exports.fetchAllGalleries = async (req, res, next) => {
	try {
		let FetchAllGallery = await db.Gallery.findAll({});

		res.status(200).json({
			status: "success",
			payload: FetchAllGallery,
			message: "Gallery fetched successfully",
		});
	} catch (error) {
		console.log("Error at Gallery method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Gallery",
		});
	}
};
exports.fetchGalleryById = async (req, res, next) => {
	try {
		let { id } = req.params;

		let fetchGallery = await db.Gallery.findOne({
			where: {
				id: id,
			},
			include: {
				model: db.GalleryAttachment,
				as: 'galleryAttachments'
			}
		});
		if (fetchGallery === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Gallery Not Found",
			});
		}
		res.status(200).json({
			status: "success",
			payload: fetchGallery,
			message: "Gallery fetched by id successfully",
		});
	} catch (error) {
		console.log("Error at Gallery By Id method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Gallery by id",
		});
	}
};
exports.createNewGallery = async (req, res, next) => {
	try {
		let {
			user_profile_id,
			name,
			description,
			status
		} = req.body;

		let newGallery = await db.Gallery.create({
			user_profile_id,
			name,
			description,
			status
		});
		res.status(200).json({
			status: "success",
			payload: newGallery,
			message: "Gallery created successfully",
		});
	} catch (error) {
		console.log('Error at post method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while creating Gallery",
		});
	}
};
exports.updateGallery = async (req, res, next) => {
	try {
		let { id } = req.params;
		let {
			user_profile_id,
			name,
			description,
			status
		} = req.body;
		let fetchGallery = await db.Gallery.findOne({
			where: {
				id: id
			}
		});
		if (fetchGallery === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Gallery not found",
			});
		}
		await db.Gallery.update(
			{
				user_profile_id: user_profile_id !== undefined
					? user_profile_id
					: fetchGallery.user_profile_id,
				name: name !== undefined ? name : fetchGallery.name,
				description: description !== undefined ? description : fetchGallery.description,
				status: status !== undefined ? status : fetchGallery.status,
			},
			{
				where: {
					id: fetchGallery.id,
				},
			}
		);
		let updatedGallery = await db.Gallery.findOne({
			where: {
				id: fetchGallery.id,
			}
		});
		return res.status(200).json({
			status: "success",
			payload: updatedGallery,
			message: "Gallery updated successfully",
		});
	} catch (error) {
		console.log('Error at PUT method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while updating Gallery",
		});
	}
};

exports.createGalleryAttachment = async (req, res, next) => {
	try {		
		let { gallery_id, is_image, video_link, status } = req.body;

		let fetchGallery = await db.Gallery.findOne({
			where: {
				id: gallery_id
			}
		});

		if(fetchGallery === null ){
			res.status(500).json({
				status: "failed",
				payload: {},
				message: "Gallery not found",
			});
		}
		let newGalleryAttachment;
		if (req.file !== undefined && is_image === 'true') {
            newGalleryAttachment = await db.GalleryAttachment.create({
				gallery_id: fetchGallery.id,
				is_image: is_image === 'true' ? true : false ,
				status
			});
            await addAttachment(req.file, GALLERIES_BUCKET_NAME, newGalleryAttachment.id, null);
            newGalleryAttachment = await db.GalleryAttachment.findOne({ where: { id: newGalleryAttachment.id } });            
        } else {
			newGalleryAttachment = await db.GalleryAttachment.create({
				gallery_id: fetchGallery.id,
				is_image: false, 
				video_link, 
				status
			});
        }
		return res.status(200).json({
			status: 'success',
			payload: newGalleryAttachment,
			message: 'GalleryAttachment created successfully'
		});
	} catch (error) {
		console.log("Error at createGalleryAttachment method- POST / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while creating GalleryAttachment",
		});
	}
};

exports.deleteGalleryAttachment = async (req, res, next) => {
	try {
		let { id } = req.params;
		let fetchGalleryAttachment = await db.GalleryAttachment.findOne({
			where: {
				id: id
			}
		});
		if(fetchGalleryAttachment === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "GalleryAttachment not found",
			});
		} else {
			if (fetchGalleryAttachment.mongo_id !== null) {
				await deleteAttachment(fetchGalleryAttachment.mongo_id, GALLERIES_BUCKET_NAME);
			}
			await db.GalleryAttachment.destroy({
				where: {
				  id: fetchGalleryAttachment.id
				}
			});
			return res.status(200).json({
				status: 'success',
				payload: fetchGalleryAttachment,
				message: 'GalleryAttachment deleted successfully'
			});
		}			
	} catch (error) {
		console.log("Error at deleteGalleryAttachment method- DELETE / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while deleting GalleryAttachment",
		});
	}
}