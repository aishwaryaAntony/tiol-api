import db from "../models";
import { addAttachment, deleteAttachment } from "../utils/attachmentServices";
import { BLOGS_BUCKET_NAME } from "../helpers/constants";

exports.fetch_all_blog = async (req, res, next) => {
	try {
		let FetchAllBlogs = await db.Blog.findAll({});

		res.status(200).json({
			status: "success",
			payload: FetchAllBlogs,
			message: "Blog fetched successfully",
		});
	} catch (error) {
		console.log("Error at Blog method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Blog",
		});
	}
};
exports.fetch_blog_by_id = async (req, res, next) => {
	try {
		let { id } = req.params;

		let fetchBlog = await db.Blog.findOne({
			where: {
				id: id,
			},
		});
		if (fetchBlog === null) {
			return res.status(200).json({
				status: "success",
				payload: null,
				message: "Blog Not Found",
			});
		}
		res.status(200).json({
			status: "success",
			payload: fetchBlog,
			message: "Blog fetched by id successfully",
		});
	} catch (error) {
		console.log("Error at Blog By Id method- GET / :" + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while fetching Blog by id",
		});
	}
};
exports.create_new_blog = async (req, res, next) => {
	try {
		let {
			user_profile_id,
			title,
			blog_creator,
			content,
			status
		} = req.body;

		

		if (req.file !== undefined) {
			
			let newBlog = await db.Blog.create({
				title,
				user_profile_id,
				blog_creator,
				content,
				status
			});
			await addAttachment(req.file, BLOGS_BUCKET_NAME, newBlog.id, null);
			newBlog = await db.Blog.findOne({ where: { id: newBlog.id } });
			return res.status(200).json({
				status: "success",
				payload: newBlog,
				message: "Blog created successfully"
			})			
		}else{

		res.status(500).json({
			status: "failed",
			payload:{},
			message: "Image not found",
		});
	}
		
	
	} catch (error) {
		console.log('Error at post method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while creating Blog",
		});
	
	}


};
exports.update_blog = async (req, res, next) => {
	try {
		let { id } = req.params;

		let {
			user_profile_id,
			title,
			blog_creator,
			content,
			file_name,
			mongo_id,
			status,
		} = req.body;

		//console.log(`Body -> ${JSON.stringify(req.body)}`);
		let fetchBlog = await db.Blog.findOne({
			where: {
				id: id,
			},
		});


		if (fetchBlog === null) {
			 return res.status(500).json({
				status: "failed",
				payload: null,
				message: "Blog not found",
			});
		}

		await db.Blog.update(
			{
				user_profile_id: user_profile_id !== undefined
					? user_profile_id 
					: fetchBlog.user_profile_id,
				title: title !== undefined ? title : fetchBlog.title,
				status: status !== undefined  ? status : fetchBlog.status,
				blog_creator: blog_creator !== undefined ? blog_creator : fetchBlog.blog_creator,
				content: content !== undefined ? content : fetchBlog.content,
				file_name: file_name !== undefined ? file_name : fetchBlog.file_name,
				mongo_id: mongo_id !== undefined ? mongo_id : fetchBlog.mongo_id,
			},
			{
				where: {
					id: fetchBlog.id,
				},
			}
		);

		//console.log(`Body 1-> ${JSON.stringify(req.body)}`);
		let updatedBlog = await db.Blog.findOne({
			where: {
				id: fetchBlog.id,

			},

		});
		// let fetchupdatedBlog = updatedBlog[1].length > 0 ? (updatedBlog[1])[0] : null;

		// if (fetchupdatedBlog !== null) {
		if (req.file !== undefined) {
			if (updatedBlog.mongo_id !== null) {
				await deleteAttachment(updatedBlog.mongo_id, BLOGS_BUCKET_NAME);
			}
			await addAttachment(req.file, BLOGS_BUCKET_NAME, updatedBlog.id, null);
			// }

			return res.status(200).json({
				status: "success",
				payload: updatedBlog,
				message: "Blog updated successfully",
			});
		} else {
			console.log('Error Image File not found');
			return res.status(500).json({
				status: "failed",
				payload: {},
				message: "Blog failed while updating",
			});
		}
	} catch (error) {
		console.log('Error at PUT method' + error);
		res.status(500).json({
			status: "failed",
			payload: {},
			message: "Error while updating Blog",
		});

	}
};