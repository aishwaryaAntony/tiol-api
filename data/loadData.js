// Parse command line arguments using yargs
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv
import Excel from "exceljs";
import db from "../src/models";


const loadMasterTable = filename => {
	return new Promise(async (resolve, reject) => {
		try {
			let workbook = new Excel.Workbook();
			console.log("File name => " + filename);
			await workbook.xlsx.readFile(filename);
			console.log("\n**********Master tables started loading**********\n");
			let role = await loadRoles(workbook);
			console.log(role)
			let user = await loadUsers(workbook);
			console.log(user)
			let userRole = await loadUserRoles(workbook);
			console.log(userRole)
			let userProfile = await loadUserProfiles(workbook);
			console.log(userProfile)
			let masterCategory = await loadMasterCategories(workbook);
			console.log(masterCategory)
			let masterSubCategory = await loadMasterSubCategories(workbook);
			console.log(masterSubCategory)
			let surveyQuestion = await loadSurveyQuestions(workbook);
			console.log(surveyQuestion)
			let surveyOption = await loadSurveyOptions(workbook);
			console.log(surveyOption)
			let awardSeason = await loadAwardSeason(workbook);
			console.log(awardSeason)
			let awardCategory = await loadAwardCategories(workbook);
			console.log(awardCategory)
			let awardSubCategory = await loadAwardSubCategories(workbook);
			console.log(awardSubCategory)
			let awardSurveyQuestions = await loadAwardSurveyQuestions(workbook);
			console.log(awardSurveyQuestions)
			let awardSurveyOptions = await loadAwardSurveyOptions(workbook);
			console.log(awardSurveyOptions)
			let industryTypes = await loadIndustryTypes(workbook);
			console.log(industryTypes)
			let Gallery = await loadGalleries(workbook);
			console.log(Gallery)
			resolve(`\u2705 Success \u2705 \n`);
		} catch (error) {
			reject(`\u274c ${error} \u274c`);
		}
	});
};

const loadRoles = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("Roles");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let roleArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let roleObj = {};
					roleObj.name = row.getCell(1).value;
					roleObj.code = row.getCell(2).value;
					roleObj.description = row.getCell(3).value;
					roleObj.status = row.getCell(4).value;
					roleArray.push(roleObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let role of roleArray) {
								const { name, code, description, status } = role;

								let findRole = await db.Role.findOne({
									where: {
										code: code
									}
								});
								if (findRole === null) {
									await db.Role.create({
										name,
										code,
										description,
										status
									});
								}
							}
							resolve(`\u2714 Role table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadUsers = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("Users");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let userArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let userObj = {};
					userObj.email = row.getCell(1).value;
					userObj.password = row.getCell(2).value;
					userObj.status = row.getCell(3).value;
					userArray.push(userObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let user of userArray) {
								const { email, password, status } = user;

								let findUser = await db.User.findOne({
									where: {
										email: email
									}
								});
								if (findUser === null) {
									await db.User.create({
										email,
										password,
										status
									});
								}
							}
							resolve(`\u2714 User table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadUserRoles = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("UserRoles");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let userRoleArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let userRoleObj = {};
					userRoleObj.email = row.getCell(1).value;
					userRoleObj.role_code = row.getCell(2).value;
					userRoleObj.is_default = row.getCell(3).value;
					userRoleObj.status = row.getCell(4).value;
					userRoleArray.push(userRoleObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let userRole of userRoleArray) {
								const { email, role_code, is_default, status } = userRole;

								let findRole = await db.Role.findOne({
									where: {
										code: role_code
									}
								});
								let findUser = await db.User.findOne({
									where: {
										email: email
									}
								});
								if (findRole !== null && findUser !== null) {
									await db.UserRole.create({
										user_id: findUser.id,
										role_id: findRole.id,
										is_default,
										status
									});
								}
							}
							resolve(`\u2714 UserRole table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadUserProfiles = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("UserProfiles");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let userProfileArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let userProfileObj = {};
					userProfileObj.email = row.getCell(1).value;
					userProfileObj.full_name = row.getCell(2).value;
					userProfileObj.status = row.getCell(3).value;
					userProfileArray.push(userProfileObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let userProfile of userProfileArray) {
								const { email, full_name, status } = userProfile;

								let findUser = await db.User.findOne({
									where: {
										email: email
									}
								});

								let findUserProfile = await db.UserProfile.findOne({
									where: {
										user_id: findUser.id
									}
								});

								if (findUserProfile === null) {
									await db.UserProfile.create({
										user_id: findUser.id,
										full_name,
										email,
										status
									});
								}
							}

							resolve(`\u2714 UserProfile table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadMasterCategories = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("MasterCategories");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let masterCategoryArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let masterCategoryObj = {};
					masterCategoryObj.code = row.getCell(1).value;
					masterCategoryObj.name = row.getCell(2).value;
					masterCategoryObj.description = row.getCell(3).value;
					masterCategoryObj.status = row.getCell(4).value;
					masterCategoryArray.push(masterCategoryObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let masterCategory of masterCategoryArray) {
								const { code, name, description, status } = masterCategory;

								let findMasterCategory = await db.MasterCategory.findOne({
									where: {
										code: code
									}
								});

								if (findMasterCategory === null) {
									await db.MasterCategory.create({
										code, name, description, status
									});
								}
							}
							resolve(`\u2714 Master Category table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadMasterSubCategories = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("MasterSubCategories");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let masterSubCategoryArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let masterSubCategoryObj = {};
					masterSubCategoryObj.master_category_code = row.getCell(1).value;
					masterSubCategoryObj.code = row.getCell(2).value;
					masterSubCategoryObj.name = row.getCell(3).value;
					masterSubCategoryObj.description = row.getCell(4).value;
					masterSubCategoryObj.status = row.getCell(5).value;
					masterSubCategoryArray.push(masterSubCategoryObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let masterSubCategory of masterSubCategoryArray) {

								const { master_category_code, code, name, description, status } = masterSubCategory;

								let findMasterCategory = await db.MasterCategory.findOne({
									where: {
										code: master_category_code
									}
								});

								if (findMasterCategory !== null) {
									let findMasterSubCategory = await db.MasterSubCategory.findOne({
										where: {
											master_category_id: findMasterCategory.id,
											code: code
										}
									});

									if (findMasterSubCategory === null) {
										await db.MasterSubCategory.create({
											master_category_id: findMasterCategory.id,
											code, name, description, status
										});
									}
								}
							}
							resolve(`\u2714 Master Sub Category table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadSurveyQuestions = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("SurveyQuestions");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let surveyQuestionArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let surveyQuestionObj = {};
					surveyQuestionObj.master_sub_category_code = row.getCell(1).value;
					surveyQuestionObj.code = row.getCell(2).value;
					surveyQuestionObj.question = row.getCell(3).value;
					surveyQuestionObj.weightage = row.getCell(4).value;
					surveyQuestionObj.status = row.getCell(5).value;
					surveyQuestionArray.push(surveyQuestionObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let surveyQuestion of surveyQuestionArray) {

								const { master_sub_category_code, code, question, weightage, status } = surveyQuestion;

								let findMasterSubCategory = await db.MasterSubCategory.findOne({
									where: {
										code: master_sub_category_code
									}
								});

								if (findMasterSubCategory !== null) {
									let findSurveyQuestion = await db.SurveyQuestion.findOne({
										where: {
											master_sub_category_id: findMasterSubCategory.id,
											code: code
										}
									});

									if (findSurveyQuestion === null) {
										await db.SurveyQuestion.create({
											master_sub_category_id: findMasterSubCategory.id,
											code, question, weightage, status
										});
									}
								}
							}
							resolve(`\u2714 Survey Question table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadSurveyOptions = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("SurveyOptions");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let surveyOptionArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let surveyOptionObj = {};
					surveyOptionObj.survey_question_code = row.getCell(1).value;
					surveyOptionObj.answer = row.getCell(2).value;
					surveyOptionObj.weightage = row.getCell(3).value;
					surveyOptionObj.status = row.getCell(4).value;
					surveyOptionArray.push(surveyOptionObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let surveyOption of surveyOptionArray) {
								const { survey_question_code, answer, weightage, status } = surveyOption;

								let findSurveyQuestion = await db.SurveyQuestion.findOne({
									where: {
										code: survey_question_code
									}
								});

								if (findSurveyQuestion !== null) {
									let findSurveyOption = await db.SurveyOption.findOne({
										where: {
											survey_question_id: findSurveyQuestion.id,
											answer: answer
										}
									});

									if (findSurveyOption === null) {
										await db.SurveyOption.create({
											survey_question_id: findSurveyQuestion.id,
											answer, weightage, status
										});
									}
								}
							}
							resolve(`\u2714 Survey Option table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadAwardSeason = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("AwardSeasons");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let awardSeasonArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let awardSeasonObj = {};
					awardSeasonObj.name = row.getCell(1).value;
					awardSeasonObj.code = row.getCell(2).value;
					awardSeasonObj.status = row.getCell(3).value;
					awardSeasonArray.push(awardSeasonObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let season of awardSeasonArray) {
								const { name, code, status } = season;

								let findAwardSeason = await db.AwardSeason.findOne({
									where: {
										code: code
									}
								});
								if (findAwardSeason === null) {
									await db.AwardSeason.create({
										event_name: name,
										code,
										status
									});
								}
							}
							resolve(`\u2714 Award Season table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadAwardCategories = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("AwardCategories");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let awardCategoryArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let awardCategoryObj = {};
					awardCategoryObj.award_season_code = row.getCell(1).value;
					awardCategoryObj.code = row.getCell(2).value;
					awardCategoryObj.name = row.getCell(3).value;
					awardCategoryObj.description = row.getCell(4).value;
					awardCategoryObj.status = row.getCell(5).value;
					awardCategoryArray.push(awardCategoryObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let awardCategory of awardCategoryArray) {
								const { award_season_code, code, name, description, status } = awardCategory;

								let findAwardSeason = await db.AwardSeason.findOne({
									where: {
										code: award_season_code
									}
								});
								if (!!findAwardSeason) {
									let findAwardCategory = await db.AwardCategory.findOne({
										where: {
											code: code
										}
									});
									let findMasterCategory = await db.MasterCategory.findOne({
										where: {
											code: code
										}
									});

									if (!!findMasterCategory && findAwardCategory === null) {
										await db.AwardCategory.create({
											master_category_ref: findMasterCategory.id,
											award_season_id: findAwardSeason.id,
											code,
											name,
											description,
											status
										});
									}
								}
							}
							resolve(`\u2714 Award Category table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadAwardSubCategories = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("AwardSubCategories");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let awardSubCategoryArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let awardSubCategoryObj = {};
					awardSubCategoryObj.award_season_code = row.getCell(1).value;
					awardSubCategoryObj.code = row.getCell(2).value;
					awardSubCategoryObj.award_category_code = row.getCell(3).value;
					awardSubCategoryObj.name = row.getCell(4).value;
					awardSubCategoryObj.description = row.getCell(5).value;
					awardSubCategoryObj.status = row.getCell(6).value;
					awardSubCategoryArray.push(awardSubCategoryObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let awardSubCategory of awardSubCategoryArray) {

								const { award_season_code, award_category_code, code, name, description, status } = awardSubCategory;

								let findAwardSeason = await db.AwardSeason.findOne({
									where: {
										code: award_season_code
									}
								});
								if (!!findAwardSeason) {
									let findAwardCategory = await db.AwardCategory.findOne({
										where: {
											code: award_category_code
										}
									});
									let findAwardSubCategory = await db.AwardSubCategory.findOne({
										where: {
											code: code
										}
									});
									let findMasterSubCategory = await db.MasterSubCategory.findOne({
										where: {
											code: code
										}
									});
									if (!!findAwardCategory && findAwardSubCategory === null) {
										await db.AwardSubCategory.create({
											master_sub_category_ref: !!findMasterSubCategory ? findMasterSubCategory.id : null,
											award_season_id: findAwardSeason.id,
											award_category_id: findAwardCategory.id,
											code,
											name,
											description,
											status
										});
									}
								}
							}
							resolve(`\u2714 Award Sub Category table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadAwardSurveyQuestions = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("AwardSurveyQuestions");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let awardSurveyQuestionArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let awardSurveyQuestionObj = {};
					awardSurveyQuestionObj.award_sub_category_code = row.getCell(1).value;
					awardSurveyQuestionObj.code = row.getCell(2).value;
					awardSurveyQuestionObj.question = row.getCell(3).value;
					awardSurveyQuestionObj.weightage = row.getCell(4).value;
					awardSurveyQuestionObj.status = row.getCell(5).value;
					awardSurveyQuestionArray.push(awardSurveyQuestionObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let awardSurveyQuestion of awardSurveyQuestionArray) {

								const { award_sub_category_code, code, question, weightage, status } = awardSurveyQuestion;

								let findAwardSubCategory = await db.AwardSubCategory.findOne({
									where: {
										code: award_sub_category_code
									}
								});

								if (findAwardSubCategory !== null) {
									let findAwardSurveyQuestion = await db.AwardSurveyQuestion.findOne({
										where: {
											award_sub_category_id: findAwardSubCategory.id,
											code: code
										}
									});

									if (findAwardSurveyQuestion === null) {
										await db.AwardSurveyQuestion.create({
											award_sub_category_id: findAwardSubCategory.id,
											code,
											question,
											weightage,
											status
										});
									}
								}
							}
							resolve(`\u2714 Award Survey Question table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadAwardSurveyOptions = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("AwardSurveyOptions");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let awardSurveyOptionArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let awardSurveyOptionObj = {};
					awardSurveyOptionObj.award_survey_question_code = row.getCell(1).value;
					awardSurveyOptionObj.answer = row.getCell(2).value;
					awardSurveyOptionObj.weightage = row.getCell(3).value;
					awardSurveyOptionObj.status = row.getCell(4).value;
					awardSurveyOptionArray.push(awardSurveyOptionObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let awardSurveyOption of awardSurveyOptionArray) {
								const { award_survey_question_code, answer, weightage, status } = awardSurveyOption;

								let findAwardSurveyQuestion = await db.AwardSurveyQuestion.findOne({
									where: {
										code: award_survey_question_code
									}
								});

								if (findAwardSurveyQuestion !== null) {
									let findAwardSurveyOption = await db.AwardSurveyOption.findOne({
										where: {
											award_survey_question_id: findAwardSurveyQuestion.id,
											answer: answer
										}
									});

									if (findAwardSurveyOption === null) {
										await db.AwardSurveyOption.create({
											award_survey_question_id: findAwardSurveyQuestion.id,
											answer,
											weightage,
											status
										});
									}
								}
							}
							resolve(`\u2714 Award Survey Option table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error); cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadIndustryTypes = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("IndustryTypes");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let industryTypeArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let industryTypeObj = {};
					industryTypeObj.name = row.getCell(1).value;
					industryTypeObj.code = row.getCell(2).value;
					industryTypeObj.status = row.getCell(3).value;
					industryTypeArray.push(industryTypeObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let industryType of industryTypeArray) {
								const { name, code, status } = industryType;

								let findIndustryType = await db.IndustryType.findOne({
									where: {
										code: code
									}
								});
								if (findIndustryType === null) {
									await db.IndustryType.create({
										name,
										code,
										status
									});
								}
							}
							resolve(`\u2714 IndustryType table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

const loadGalleries = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("Galleries");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let galleryArray = [];
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let galleryObj = {};
					galleryObj.email = row.getCell(1).value;
					galleryObj.name = row.getCell(2).value;
					galleryObj.description = row.getCell(3).value;
					galleryObj.status = row.getCell(4).value;
					galleryArray.push(galleryObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let gallery of galleryArray) {
								const { name, email, status, description } = gallery;
								let findUserProfile = await db.UserProfile.findOne({
									where: {
										email: email
									}
								});
								if (findUserProfile !== null) {
									let fetchGallery = await db.Gallery.findOne({
										where: {
											name: name
										}
									});
									if (fetchGallery === null) {
										await db.Gallery.create({
											user_profile_id: findUserProfile.id,
											name,
											status,
											description
										});
									}
								}
							}
							resolve(`\u2714 Gallery table loaded successfully \u2705 \n`);
						}
					}
				}
			});
		} catch (error) {
			cosole.log(error);
			reject(`\u274c Error ==> ${error}`);
		}
	});
};

if (argv.command === "master") {
	try {
		console.log("Loading data from " + JSON.stringify(argv.file));
		if (!!argv.file) {
			loadMasterTable(argv.file).then(result => {
				console.log(result);
				process.exit();
			});
		}
	} catch (error) {
		console.log("error=================>" + error);
	}
}

// node ./dist/data/loadData.js --command=master --file=./dist/data/TiolData.xlsx