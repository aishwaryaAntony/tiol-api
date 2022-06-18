"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_galleries = async (req, res, next) => {
	try {
		let FetchAllGallery = await _models2.default.Gallery.findAll({});

		res.status(200).json({
			status: "success",
			payload: FetchAllGallery,
			message: "Gallery fetched successfully"
		});
	} catch (error) {
		console.log("Error at Gallery method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Gallery"
		});
	}
};
exports.fetch_gallery_by_id = async (req, res, next) => {
	try {
		let { id } = req.params;

		let fetchGallery = await _models2.default.Gallery.findOne({
			where: {
				id: id
			}
		});
		if (fetchGallery === null) {
			return res.status(200).json({
				status: "success",
				payload: null,
				message: "Gallery Not Found"
			});
		}
		res.status(200).json({
			status: "success",
			payload: fetchGallery,
			message: "Gallery fetched by id successfully"
		});
	} catch (error) {
		console.log("Error at Gallery By Id method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Gallery by id"
		});
	}
};
exports.create_new_gallery = async (req, res, next) => {
	try {
		let {
			user_profile_id,
			name,
			description,
			status
		} = req.body;

		let newGallery = await _models2.default.Gallery.create({
			user_profile_id,
			name,
			description,
			status
		});
		res.status(200).json({
			status: "success",
			payload: newGallery,
			message: "Gallery created successfully"
		});
	} catch (error) {
		console.log('Error at post method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while creating Gallery"
		});
	}
};
exports.update_gallery = async (req, res, next) => {
	try {
		let { id } = req.params;
		let {
			user_profile_id,
			name,
			description,
			status
		} = req.body;
		let fetchGallery = await _models2.default.Gallery.findOne({
			where: {
				id: id
			}
		});
		if (fetchGallery === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Gallery not found"
			});
		}
		await _models2.default.Gallery.update({
			user_profile_id: user_profile_id !== undefined ? user_profile_id : fetchGallery.user_profile_id,
			name: name !== undefined ? name : fetchGallery.name,
			description: description !== undefined ? description : fetchGallery.description,
			status: status !== undefined ? status : fetchGallery.status
		}, {
			where: {
				id: fetchGallery.id
			}
		});
		let updatedGallery = await _models2.default.Gallery.findOne({
			where: {
				id: fetchGallery.id
			}
		});
		return res.status(200).json({
			status: "success",
			payload: updatedGallery,
			message: "Gallery updated successfully"
		});
	} catch (error) {
		console.log('Error at PUT method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while updating Gallery"
		});
	}
};