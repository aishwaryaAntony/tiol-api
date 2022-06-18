import db from "../models";
const { Op } = require("sequelize");
import { send_mail } from "../notifications/emailUtils";
import {  NODE_ENV, CLIENT_END_POINT } from "../helpers/constants";

exports.fetch_all_nominee_application = async (req, res, next) => {
    try {
        let fetchAllNomineeApplication = await db.NomineeApplication.findAll({
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.NomineeApplicationSurvey,
                    as: 'nomineeApplicationSurveys',
                    include: [{
                        model: db.AwardSurveyQuestion,
                        as: 'awardSurveyQuestion'
                    }]
                },
            ]
        });
        res.status(200).json({
            status: 'success',
            payload: fetchAllNomineeApplication,
            message: 'NomineeApplications fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at NomineeApplications method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplications'
        });
    }
}

exports.fetch_nominee_application_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.NomineeApplicationSurvey,
                    as: 'nomineeApplicationSurveys',
                    include: [
                        {
                            model: db.AwardSurveyQuestion,
                            as: 'awardSurveyQuestion',
                        },
                        {
                            model: db.AwardSurveyOption,
                            as: 'awardSurveyOption'
                        }
                    ]
                },
            ]

        });
        if (findNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findNomineeApplication,
            message: 'NomineeApplication fetched by id successfully'
        });
    }
    catch (error) {
        console.log("Error at NomineeApplication By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplication by id'
        });
    }
}

exports.create_new_nominee_application = async (req, res, next) => {
    try {
        let { award_season_id, award_sub_category_id, nominator_ref, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status } = req.body;

        // let findNomineeApplication = await db.AwardSeason.findOne({
        //     where: {
        //         id: award_season_id
        //     }
        // })
        // console.log("=============>findNomineeApplication" + JSON.stringify(findNomineeApplication))
        // if (findNomineeApplication === null) {
        //     return res.status(200).json({
        //         status: 'failed',
        //         payload: null,
        //         message: 'Invalid NomineeApplication'
        //     });
        // }

        // let findSubCategory = await db.AwardSubCategory.findOne({
        //     where: {
        //         id: award_sub_category_id
        //     }
        // })

        // if (findSubCategory === null) {
        //     return res.status(200).json({
        //         status: 'success',
        //         payload: null,
        //         message: 'Invalid SubCategory'
        //     });
        // }

        let new_nomineeApplication = await db.NomineeApplication.create({
            award_season_id,
            award_sub_category_id,
            nominator_ref,
            nominee_name,
            email,
            nominee_contact_number,
            pan_number,
            company_name,
            state,
            city,
            postal_address,
            pin_code,
            industry_type,
            nominee_business,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_nomineeApplication,
            message: 'NomineeApplication created successfully'
        });
    }

    catch (error) {
        console.log("Error at create new nomineeApplication method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating nomineeApplication'
        });
    }
};

exports.update_nominee_application = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status, isSelfNomination } = req.body;

        let findNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: id
            }
        });

        if (findNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }

        let findNominator = await db.UserProfile.findOne({
            where: {
                id: nominator_ref
            }
        });
        if (findNominator === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'nominator not found'
            });
        }

        let findNominee = await db.UserProfile.findOne({
            where: {
                email: email
            }
        });

        await db.NomineeApplication.update({
            award_season_id: award_season_id ? award_season_id : findNomineeApplication.award_season_id,
            award_sub_category_id: award_sub_category_id ? award_sub_category_id : findNomineeApplication.award_sub_category_id,
            nominee_name: nominee_name ? nominee_name : findNomineeApplication.nominee_name,
            email: email ? email : findNomineeApplication.email,
            nominee_contact_number: nominee_contact_number ? nominee_contact_number : findNomineeApplication.nominee_contact_number,
            pan_number: pan_number ? pan_number : findNomineeApplication.pan_number,
            company_name: company_name ? company_name : findNomineeApplication.company_name,
            state: state ? state : findNomineeApplication.state,
            city: city ? city : findNomineeApplication.city,
            postal_address: postal_address ? postal_address : findNomineeApplication.postal_address,
            industry_type: industry_type ? industry_type : findNomineeApplication.industry_type,
            nominee_business: nominee_business ? nominee_business : findNomineeApplication.nominee_business,
            status: status ? status : findNomineeApplication.status,
            nominator_ref: findNominator.id,
            user_profile_ref: findNominee !== null ? findNominee.id : null
        },
        {
            where: {
                id: id
            }
        });

        let updatedNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: id
            }
        });

        let fetchAwardSubCategory = await db.AwardSubCategory.findOne({
            where: {
                id: award_sub_category_id
            },
            include: [
                {
                    model: db.AwardCategory,
                    as: 'awardCategory'
                }
            ]
        });

        let message = {};
        let base64Email = Buffer.from(email).toString('base64');
        if (findNominee === null) {
            // message.email = Buffer.from(email).toString('base64');
            message.description = `You've been nominated for ${fetchAwardSubCategory.awardCategory.name} - ${fetchAwardSubCategory.name} by ${findNominator.full_name}.\nKindly register with us to complete the nomination details.`;
            message.link = `${CLIENT_END_POINT}register?token=${base64Email}`;
            NODE_ENV === 'production' ? send_mail("NON-REG", email, nominee_name, message) : console.log(' <=== Nomination notify email can send in production mode ===> ');
        }else{
            // message.email = Buffer.from(email).toString('base64');
            if(!!status && status === 'DRAFT'){
                message.description = `You've been nominated for ${fetchAwardSubCategory.awardCategory.name} - ${fetchAwardSubCategory.name} by ${findNominator.full_name}.\nKindly register with us to complete the nomination details.`;
                message.link = `${CLIENT_END_POINT}register?token=${base64Email}`;
                NODE_ENV === 'production' ? send_mail("NON-REG", email, nominee_name, message) : console.log(' <=== Nomination notify email can send in production mode ===> ');
            }else{
                message.description = `You've been nominated for ${fetchAwardSubCategory.awardCategory.name} - ${fetchAwardSubCategory.name} by ${findNominator.full_name}.\nKindly login to complete the nominations.`;
                message.link = ``;
                NODE_ENV === 'production' ? send_mail("REG", email, nominee_name, message) : console.log(' <=== Registration email can send in production mode ===> ');
            }
        }

        res.status(200).json({
            status: 'success',
            payload: updatedNomineeApplication,
            message: 'NomineeApplication updated successfully'
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating NomineeApplication'
        });
    }
}

exports.find_or_create_new_nominee_application = async (req, res, next) => {
    try {
        let { award_season_id, award_sub_category_id, nominator_ref, nominee_name, email, nominee_contact_number, pan_number, company_name, state, city, postal_address, pin_code,
            industry_type, nominee_business, status, nominee_application_id } = req.body;


        let findNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: !!nominee_application_id ? nominee_application_id : null
            }
        })
        let nomineeApplication = null;
        if (findNomineeApplication === null) {
            nomineeApplication = await db.NomineeApplication.create({
                award_season_id,
                award_sub_category_id,
                nominator_ref,
                nominee_name,
                email,
                nominee_contact_number,
                pan_number,
                company_name,
                state,
                city,
                postal_address,
                pin_code,
                industry_type,
                nominee_business,
                status
            })
        } else {
            let updatedNomineeApplication = await db.NomineeApplication.update({
                award_season_id,
                award_sub_category_id,
                nominator_ref,
                nominee_name,
                email,
                nominee_contact_number,
                pan_number,
                company_name,
                state,
                city,
                postal_address,
                pin_code,
                industry_type,
                nominee_business,
                status
            }, {
                where: {
                    id: findNomineeApplication.id
                },
                returning: true,
            });
            nomineeApplication = updatedNomineeApplication.length > 0 ? updatedNomineeApplication[1][0] : null;
        }

        res.status(200).json({
            status: 'success',
            payload: nomineeApplication,
            message: 'NomineeApplication created successfully'
        });
    }

    catch (error) {
        console.log("Error at find/create new nomineeApplication method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating nomineeApplication in find/create method'
        });
    }
};

exports.fetch_all_nominee_application_by_user_id = async (req, res, next) => {
    try {
        let id = parseInt(req.userData.user_id);

        let findNomineeApplications = await db.NomineeApplication.findAll({
            where: {
                [Op.or]: [{ nominator_ref: id }, { user_profile_ref: id }],
            },
            include:[
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.AwardSubCategory,
                    as: 'awardSubCategory'
                },
                {
                    model: db.UserProfile,
                    as:'nominatorProfile'
                },
                {
                    model: db.SelectedNominee,
                    as:'selectedNominee'
                }
            ]
        });
        res.status(200).json({
            status: 'success',
            payload: findNomineeApplications,
            message: 'NomineeApplications fetched by user_id successfully'
        });
    }
    catch (error) {
        console.log("Error at NomineeApplications By user_id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplications by user_id'
        });
    }
}

exports.update_nominee_application_status = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { status, total_weightage } = req.body;

        let fetchNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: id
            }
        });
        if (fetchNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        await db.NomineeApplication.update({
            status: status
        },
            {
                where: {
                    id: id
                }
            }
        );
        if (status === 'ACCEPTED') {
            let selectedNominee = await db.SelectedNominee.create({
                user_profile_id: fetchNomineeApplication.user_profile_id,
                award_season_id: fetchNomineeApplication.award_season_id,
                award_sub_category_id: fetchNomineeApplication.award_sub_category_id,
                nominator_ref: fetchNomineeApplication.nominator_ref,
                nominee_application_id: fetchNomineeApplication.id,
                nominee_name: fetchNomineeApplication.nominee_name,
                email: fetchNomineeApplication.email,
                nominee_contact_number: fetchNomineeApplication.nominee_contact_number,
                pan_number: fetchNomineeApplication.pan_number,
                company_name: fetchNomineeApplication.company_name,
                state: fetchNomineeApplication.state,
                city: fetchNomineeApplication.city,
                postal_address: fetchNomineeApplication.postal_address,
                pin_code: fetchNomineeApplication.pin_code,
                industry_type: fetchNomineeApplication.industry_type,
                nominee_business: fetchNomineeApplication.nominee_business,
                status,
                total_weightage
            });

            let fetchUser = await db.User.findOne({
                where: {
                    email: fetchNomineeApplication.email
                },
                include:{
                    model: db.UserProfile,
                    as: 'userProfile'
                }
            });

            let fetchAwardSubCategory = await db.AwardSubCategory.findOne({
                where: {
                    id: fetchNomineeApplication.award_sub_category_id,
                },
                include:{
                    model: db.AwardCategory,
                    as: 'awardCategory'
                }
            });

            let message = {};
            message.description = `You've been selected for ${fetchAwardSubCategory.awardCategory.name} - ${fetchAwardSubCategory.name} nomination.\nKindly share the link for voting`;
            message.link = `${CLIENT_END_POINT}voting?nomination=${selectedNominee.nomination_unique_id}`;
            NODE_ENV === 'production' ? await send_mail("VTL", fetchNomineeApplication.email, fetchUser.userProfile.full_name, message) : console.log(' <=== Voting Link email can send in production mode ===> ');
        }
        let updatedNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({
            status: 'success',
            payload: updatedNomineeApplication,
            message: 'NomineeApplication status updated successfully'
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updating NomineeApplication status'
        });
    }
}

exports.fetch_nominee_application_by_sequence_number = async (req, res, next) => {
    try {
        let { application_sequence_number } = req.params;

        let findNomineeApplication = await db.NomineeApplication.findOne({
            where: {
                application_sequence_number: application_sequence_number
            },
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.UserProfile,
                    as: 'nominatorProfile'
                },
                {
                    model: db.NomineeApplicationSurvey,
                    as: 'nomineeApplicationSurveys',
                    include: [
                        {
                            model: db.AwardSurveyQuestion,
                            as: 'awardSurveyQuestion',
                        },
                        {
                            model: db.AwardSurveyOption,
                            as: 'awardSurveyOption'
                        }
                    ]
                },
            ]

        });
        if (findNomineeApplication === null) {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'NomineeApplication not found'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findNomineeApplication,
            message: 'NomineeApplication fetched by id successfully'
        });
    }
    catch (error) {
        console.log("Error at NomineeApplication By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplication by id'
        });
    }
}

exports.fetch_submitted_nominee_application = async (req, res, next) => {
    try {
        let fetchAllNomineeApplication = await db.NomineeApplication.findAll({
            where:{
                status: {
                    [Op.ne]: "DRAFT" 
                }
            },
            include: [
                {
                    model: db.AwardSeason,
                    as: 'awardSeason'
                },
                {
                    model: db.AwardSubCategory,
                    as: 'awardSubCategory'
                },
                {
                    model: db.NomineeApplicationSurvey,
                    as: 'nomineeApplicationSurveys',
                    include: [{
                        model: db.AwardSurveyQuestion,
                        as: 'awardSurveyQuestion'
                    },
                    {
                        model: db.AwardSurveyOption,
                        as: 'awardSurveyOption'
                    }
                ]
                },
            ]
        });
        res.status(200).json({
            status: 'success',
            payload: fetchAllNomineeApplication,
            message: 'NomineeApplications fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at NomineeApplications method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching NomineeApplications'
        });
    }
}