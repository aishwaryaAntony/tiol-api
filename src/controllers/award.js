import db from "../models";

exports.fetchAllAwards = async (req, res, next) => {
	try {
		let FetchAllAward = await db.Award.findAll({});

		res.status(200).json({
			status: "success",
			payload: FetchAllAward,
			message: "Award fetched successfully",
		});
	} catch (error) {
		console.log("Error at Award method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Award",
		});
	}
};
exports.fetchAwardById = async (req, res, next) => {
	try {
		let { id } = req.params;

		let fetchAward = await db.Award.findOne({
			where: {
				id: id,
			}
		});
		if (fetchAward === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Award Not Found",
			});
		}
		res.status(200).json({
			status: "success",
			payload: fetchAward,
			message: "Award fetched by id successfully",
		});
	} catch (error) {
		console.log("Error at Award By Id method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Award by id",
		});
	}
};
exports.createNewAward = async (req, res, next) => {
	try {
		let {
			name,
			description,
			status
		} = req.body;

		let newAward = await db.Award.create({
			name,
			description,
			status
		});
		res.status(200).json({
			status: "success",
			payload: newAward,
			message: "Award created successfully",
		});
	} catch (error) {
		console.log("Error at Award method- POST / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while creating Award",
		});
	}
};
exports.updateAward = async (req, res, next) => {
	try {
		let { id } = req.params;
		let {
			name,
			description,
			status
		} = req.body;
		let fetchAward = await db.Award.findOne({
			where: {
				id: id
			}
		});
		if (fetchAward === null) {
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Award not found",
			});
		}
		await db.Award.update(
			{
				name: name !== undefined ? name : fetchAward.name,
				description: description !== undefined ? description : fetchAward.description,
				status: status !== undefined ? status : fetchAward.status,
			},
			{
				where: {
					id: fetchAward.id,
				},
			}
		);
		let updatedAward = await db.Award.findOne({
			where: {
				id: fetchAward.id,
			}
		});
		return res.status(200).json({
			status: "success",
			payload: updatedAward,
			message: "Award updated successfully",
		});
	} catch (error) {
		console.log("Error at Award method- PUT / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while updating Award",
		});
	}
};