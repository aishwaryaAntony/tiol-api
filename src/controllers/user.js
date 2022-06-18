import db from "../models";
import userHelper from "../helpers/userHelper";
import { JWT_CONFIG, REFRESH_TOKEN } from "../../config/config";
import { NODE_ENV, JURIES_BUCKET_NAME } from "../helpers/constants";
import jwt from 'jsonwebtoken';
import { addNomineeApplicationToUser } from "../helpers/nomineeApplicationHelper";
import { send_mail } from "../notifications/emailUtils";
import { addAttachment, deleteAttachment } from "../utils/attachmentServices";
const { Op } = require("sequelize");

exports.getAllUser = async (req, res, next) => {
    try {
        let fetchAllUsers = await db.User.findAll({
            include: [{
                model: db.UserProfile,
                as: 'userProfile',
                include: [{
                    model: db.Jury,
                    as: 'jury',
                }]
            },
            {
                model: db.UserRole,
                as: 'userRoles',
                include: [{
                    model: db.Role,
                    as: 'role',
                }]
            }]
        });
        res.status(200).json({
            status: "success",
            payload: fetchAllUsers,
            message: "Users fetched successfully"
        })
    } catch (error) {
        console.log("Error at User method- GET / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Users fetched successfully"
        })
    }
};

exports.signUp = async (req, res, next) => {
    try {
        const { full_name, email, password, mobile_number, pan_number, role_code, status } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email
            }
        })
        // role_code = "USR";
        if (fetchUser !== null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User already exist"
            })
        } else {
            /*                 
                * Verification Code will be sent to registered email for setting password
            */
            const code = NODE_ENV === 'production' ? await userHelper.createUniqueVerificationCode() : '000000';
            let newUser = await db.User.create({
                email: email,
                verification_code: code,
                password,
                status: "PENDING"
            });
            let currentProfile = await db.UserProfile.create({
                user_id: newUser.id,
                full_name, email, mobile_number, pan_number, status
            });

            await addNomineeApplicationToUser(email, currentProfile);
            let findRole = await db.Role.findOne({
                where: {
                    code: role_code
                }
            });
            let findUserRole = await db.UserRole.findOne({
                where: {
                    user_id: newUser.id,
                    role_id: findRole.id,
                }
            });
            if (findUserRole === null) {
                await db.UserRole.create({
                    user_id: newUser.id,
                    role_id: findRole.id,
                    is_default: true,
                    status: "ACTIVE"
                });

                let message = {};
                message.code = code;
                NODE_ENV === 'production' ? send_mail("OTP", email, full_name, message) : console.log(' <=== OTP email can send in production mode ===> ');

                return res.status(200).json({
                    status: "success",
                    payload: {},
                    message: "User created successfully, verification code sent to registered email"
                })
            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "user role already exist"
                })
            }
        }
    } catch (error) {
        console.log("Error at create_new_user method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while creating"
        })
    }

};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email,
                status: {
                    [Op.or]: ['ACTIVE', 'PENDING']
                }
            },
            include: [
                {
                    model: db.UserProfile,
                    as: 'userProfile'
                },
                {
                    model: db.UserRole,
                    as: 'userRoles',
                    where: {
                        is_default: true
                    },
                    required: false,
                    include: [
                        {
                            model: db.Role,
                            as: 'role'
                        }
                    ]
                }
            ]
        });
        if (fetchUser !== null) {
            let isExist = await db.User.validPassword(fetchUser, req.body);
            if (isExist) {
                await db.User.update({
                    last_login: new Date()
                }, {
                    where: {
                        email: email
                    }
                });

                let payload = {};
                payload.user_id = fetchUser.id;
                payload.full_name = fetchUser.userProfile.full_name;
                payload.role = fetchUser.userRoles[0].role.code;
                payload.email = fetchUser.userProfile.email;
                payload.mobile_number = fetchUser.userProfile.mobile_number;

                let accessToken = jwt.sign(payload, JWT_CONFIG.secret, JWT_CONFIG.options);
                let refreshToken = jwt.sign(payload, REFRESH_TOKEN.secret, REFRESH_TOKEN.options);

                return res.status(200).json({
                    status: "success",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    payload: isExist,
                    message: "User Logged in successfully"
                });

            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "Invalid Password"
                });
            }
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User not found or User inactive"
            });
        }
    } catch (error) {
        console.log("Error at login method- POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed login"
        })
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email
            },
            include: {
                model: db.UserProfile,
                as: "userProfile"
            }
        });
        if (fetchUser !== null) {
            /* 
                // Need to implement nodemailer
                * Verification Code will be sent to registered email for setting password
            */
            let code = NODE_ENV === 'production' ? await userHelper.createUniqueVerificationCode() : '000000';
            await db.User.update({
                verification_code: code
            }, {
                where: {
                    email: email
                },
                returning: true
            });

            let message = {};
            message.code = code;
            NODE_ENV === 'production' ? send_mail("OTP", email, fetchUser.userProfile.full_name, message) : console.log(' <=== OTP email can send in production mode ===> ');

            return res.status(200).json({
                status: "success",
                payload: fetchUser,
                message: "Verification code sent to your registered email"
            });
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "Email is not registered"
            });
        }
    } catch (error) {
        console.log("Error at forgot_password method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Forgot password request failed"
        })
    }
};

exports.verifyingAccount = async (req, res, next) => {
    try {
        const { email, password, verification_code } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email,
                verification_code: verification_code
            },
            include: [
                {
                    model: db.UserProfile,
                    as: 'userProfile'
                },
                {
                    model: db.UserRole,
                    as: 'userRoles',
                    where: {
                        is_default: true
                    },
                    required: false,
                    include: [
                        {
                            model: db.Role,
                            as: 'role'
                        }
                    ]
                }
            ]
        });
        if (fetchUser !== null) {
            await db.User.update({
                verification_code: null,
                status: "ACTIVE"
            }, {
                where: {
                    id: fetchUser.id
                }
            });

            let payload = {};
            payload.user_id = fetchUser.id;
            payload.full_name = fetchUser.userProfile.full_name;
            payload.role = fetchUser.userRoles[0].role.code;
            payload.email = fetchUser.userProfile.email;
            payload.mobile_number = fetchUser.userProfile.mobile_number;

            let accessToken = jwt.sign(payload, JWT_CONFIG.secret, JWT_CONFIG.options);
            let refreshToken = jwt.sign(payload, REFRESH_TOKEN.secret, REFRESH_TOKEN.options);

            return res.status(200).json({
                status: "success",
                accessToken: accessToken,
                refreshToken: refreshToken,
                payload: fetchUser,
                message: "User verified successfully"
            });
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User failed while verifying"
            });
        }
    } catch (error) {
        console.log("Error at verifying_account method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while verifying"
        })
    }
};

exports.resettingPassword = async (req, res, next) => {
    try {
        const { email, password, verification_code } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email,
                verification_code: verification_code
            }
        });
        if (fetchUser !== null) {
            await db.User.update({
                password: password,
                verification_code: null
            }, {
                where: {
                    email: email,
                    verification_code: verification_code
                }
            });
            return res.status(200).json({
                status: "success",
                payload: {},
                message: "Password resetted successfully"
            });
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User not found while resetting password"
            })
        }
    } catch (error) {
        console.log("Error at resetting_password method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while creating"
        })
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        let fetchUser = await db.User.findOne({
            where: {
                id: req.userData.user_id,
                status: {
                    [Op.or]: ['ACTIVE', 'PENDING']
                }
            },
            include: [
                {
                    model: db.UserProfile,
                    as: 'userProfile'
                },
                {
                    model: db.UserRole,
                    as: 'userRoles',
                    where: {
                        is_default: true
                    },
                    required: false,
                    include: [
                        {
                            model: db.Role,
                            as: 'role'
                        }
                    ]
                }
            ]
        });
        if (fetchUser !== null) {

            await db.User.update({
                last_login: new Date()
            }, {
                where: {
                    id: req.userData.user_id
                }
            });
            let payload = {};
            payload.user_id = fetchUser.id;
            payload.full_name = fetchUser.userProfile.full_name;
            payload.role = fetchUser.userRoles[0].role.code;
            payload.email = fetchUser.userProfile.email;
            payload.mobile_number = fetchUser.userProfile.mobile_number;

            let accessToken = jwt.sign(payload, JWT_CONFIG.secret, JWT_CONFIG.options);
            let refreshToken = jwt.sign(payload, REFRESH_TOKEN.secret, REFRESH_TOKEN.options);

            return res.status(200).json({
                status: "success",
                accessToken: accessToken,
                refreshToken: refreshToken,
                payload: fetchUser,
                message: "User authenticated successfully"
            });

        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User not found / User inactive"
            });
        }
    } catch (error) {
        console.log("Error at authenticate method- GET / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed authenticating"
        })
    }
};

exports.createNewUserByAdmin = async (req, res, next) => {
    try {
        const { full_name, email, password, mobile_number, pan_number, role_code, status, designation, description, bio, priority } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                email: email
            }
        });

        if (fetchUser !== null) {
            return res.status(200).json({
                status: "success",
                payload: {},
                message: "User Created by Admin already exist"
            })
        } else {
            /* 
                * Password will be sent to registered email for logging in
            */
            const generatedPassword = NODE_ENV === 'development' ? 'Password123' : await userHelper.createPassword(8);
            // console.log("generatedPassword =====> " + generatedPassword);

            let newUser = await db.User.create({
                email: email,
                password: generatedPassword,
                status: "ACTIVE"
            });

            let newUserProfile = await db.UserProfile.create({
                user_id: newUser.id,
                full_name, email, mobile_number, pan_number, status
            });
            let findRole = await db.Role.findOne({
                where: {
                    code: role_code
                }
            });
            let findUserRole = await db.UserRole.findOne({
                where: {
                    user_id: newUser.id,
                    role_id: findRole.id,
                }
            });
            if (findUserRole === null) {
                await db.UserRole.create({
                    user_id: newUser.id,
                    role_id: findRole.id,
                    is_default: true,
                    status: "ACTIVE"
                });

                if(findRole.code === 'JRY'){
                    let newJury = await db.Jury.create({
                        user_profile_id: newUserProfile.id, description, designation, status: "ACTIVE", bio, priority: parseInt(priority)
                    });
    
                    if (req.file !== undefined) {
                        await addAttachment(req.file, JURIES_BUCKET_NAME, newJury.id, null);
                        newJury = await db.Jury.findOne({ where: { id: newJury.id } });
                    }
                }               

                let message = {};
                message.password = generatedPassword;
                NODE_ENV === 'production' ? send_mail("PWD", email, full_name, message) : console.log(' <=== Password email can send in production mode ===> ');

                let fetchNewUser = await db.User.findOne({
                    where:{
                        id: newUser.id,
                    },
                    include: [{
                        model: db.UserProfile,
                        as: 'userProfile',
                        include: [{
                            model: db.Jury,
                            as: 'jury',
                        }]
                    },
                    {
                        model: db.UserRole,
                        as: 'userRoles',
                        include: [{
                            model: db.Role,
                            as: 'role',
                        }]
                    }]
                });

                return res.status(200).json({
                    status: "success",
                    payload: fetchNewUser,
                    message: "Creating User by admin successfully, Password sent to registered email"
                })
            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "User created by Admin failed while creating"
                })
            }
        }
    } catch (error) {
        console.log("Error at createNewUserByAdmin method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User created by Admin failed while creating"
        })
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        let { password, new_password } = req.body;
        let email = req.userData.email;

        let fetchUser = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (fetchUser !== null) {
            let isExist = await db.User.validPassword(fetchUser, req.body);
            if (isExist) {
                await db.User.update({
                    password: new_password,
                }, {
                    where: {
                        email: email
                    }
                });
                return res.status(200).json({
                    status: "success",
                    payload: {},
                    message: "Password changed successfully"
                });
            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "Invalid Password"
                });
            }
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User not found while changing password"
            })
        }
    } catch (error) {
        console.log("Error at changing_password method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while changing password"
        })
    }
};

exports.updateUserByAdmin = async (req, res, next) => {
    try {
        let { id } = req.params;
        const { full_name, email, password, mobile_number, pan_number, role_code, status, designation, description, bio, priority } = req.body;
        let fetchUser = await db.User.findOne({
            where: {
                id: id
            }
        });

        if (fetchUser === null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User not found"
            })
        } else {
            let updateUser = await db.User.update({
                status: status ? status : fetchUser.status
            }, {
                where: {
                    id: fetchUser.id
                }
            });

            let fetchUserProfile = await db.UserProfile.findOne({
                where: {
                    user_id: fetchUser.id
                }
            });

            if (fetchUserProfile === null) {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "User Profile not found"
                })
            } else {
                let updateUserProfile = await db.UserProfile.update({
                    full_name: !!full_name ? full_name : fetchUserProfile.full_name,
                    mobile_number: !!mobile_number ? mobile_number : fetchUserProfile.mobile_number,
                    pan_number: pan_number,
                    status: !!status ? status : fetchUserProfile.status
                }, {
                    where: {
                        id: fetchUserProfile.id
                    },
                    returning: true               
                });

                let fetchupdatedUserProfile = updateUserProfile[1].length > 0 ? (updateUserProfile[1])[0] : null;

                let fetchJury = await db.Jury.findOne({
                    where: {
                        user_profile_id: fetchupdatedUserProfile.id,
                    }
                });

                if(fetchJury !== null){
                    let updateJury = await db.Jury.update({
                        description: !!description ? description : fetchJury.description,
                        designation: !!designation ? designation : fetchJury.designation,
                        bio: !!bio ? bio : fetchJury.bio,
                        status: !!status ? status : fetchJury.status,
                        priority: !!priority ? parseInt(priority) : fetchJury.priority

                    }, {
                        where: {
                            user_profile_id: fetchJury.user_profile_id,
                        },
                        returning: true
                    });
                    let fetchUpdatedJury = updateJury[1].length > 0 ? (updateJury[1])[0] : null;
    
                    if (fetchUpdatedJury !== null) {
                        if (req.file !== undefined) {
                            if (fetchUpdatedJury.mongo_id !== null) {
                                await deleteAttachment(fetchUpdatedJury.mongo_id, JURIES_BUCKET_NAME);
                            }
                            await addAttachment(req.file, JURIES_BUCKET_NAME, fetchUpdatedJury.id, null);
                        }
                    }
                }
                                
                let fetchUpdatedUser = await db.User.findOne({
                    where:{
                        id: fetchUser.id
                    },
                    include: [{
                        model: db.UserProfile,
                        as: 'userProfile',
                        include: [{
                            model: db.Jury,
                            as: 'jury',
                        }]
                    },
                    {
                        model: db.UserRole,
                        as: 'userRoles',
                        include: [{
                            model: db.Role,
                            as: 'role',
                        }]
                    }]
                });

                return res.status(200).json({
                    status: "success",
                    payload: fetchUpdatedUser,
                    message: "Updating User by admin successfully"
                });
            }            
        }
    } catch (error) {
        console.log("Error at updateUserByAdmin method - PUT / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User updated by Admin failed while updating"
        })
    }
}