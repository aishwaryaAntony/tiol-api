"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _userHelper = require("../helpers/userHelper");

var _userHelper2 = _interopRequireDefault(_userHelper);

var _config = require("../../config/config");

var _constants = require("../helpers/constants");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _emailUtils = require("../notifications/emailUtils");

var _attachmentServices = require("../utils/attachmentServices");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Op } = require("sequelize");

exports.get_all_user = async (req, res, next) => {
    try {
        let fetchAllUsers = await _models2.default.User.findAll({
            include: [{
                model: _models2.default.UserProfile,
                as: 'userProfile'
            }, {
                model: _models2.default.UserRole,
                as: 'userRoles',
                include: [{
                    model: _models2.default.Role,
                    as: 'role'
                }]
            }]
        });
        res.status(200).json({
            status: "success",
            payload: fetchAllUsers,
            message: "Users fetched successfully"
        });
    } catch (error) {
        console.log("Error at User method- GET / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Users fetched successfully"
        });
    }
};

exports.create_new_user = async (req, res, next) => {
    try {
        const { full_name, email, password, mobile_number, pan_number, role_code, status } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email
            }
        });
        // role_code = "USR";
        if (fetchUser !== null) {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "User already exist"
            });
        } else {
            /*                 
                * Verification Code will be sent to registered email for setting password
            */
            const code = _constants.NODE_ENV === 'development' ? '000000' : await _userHelper2.default.createUniqueVerificationCode();
            let newUser = await _models2.default.User.create({
                email: email,
                verification_code: code,
                password,
                status: "PENDING"
            });
            await _models2.default.UserProfile.create({
                user_id: newUser.id,
                full_name, email, mobile_number, pan_number, status
            });
            let findRole = await _models2.default.Role.findOne({
                where: {
                    code: role_code
                }
            });
            let findUserRole = await _models2.default.UserRole.findOne({
                where: {
                    user_id: newUser.id,
                    role_id: findRole.id
                }
            });
            if (findUserRole === null) {
                await _models2.default.UserRole.create({
                    user_id: newUser.id,
                    role_id: findRole.id,
                    is_default: true,
                    status: "ACTIVE"
                });

                let message = {};
                message.code = code;
                _constants.NODE_ENV === 'development' ? console.log(' <=== OTP email can send in production mode ===> ') : await (0, _emailUtils.send_mail)("OTP", email, full_name, message);

                return res.status(200).json({
                    status: "success",
                    payload: {},
                    message: "User created successfully, verification code sent to registered email"
                });
            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "user role already exist"
                });
            }
        }
    } catch (error) {
        console.log("Error at create_new_user method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while creating"
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email,
                status: {
                    [Op.or]: ['ACTIVE', 'PENDING']
                }
            },
            include: [{
                model: _models2.default.UserProfile,
                as: 'userProfile'
            }, {
                model: _models2.default.UserRole,
                as: 'userRoles',
                where: {
                    is_default: true
                },
                required: false,
                include: [{
                    model: _models2.default.Role,
                    as: 'role'
                }]
            }]
        });
        if (fetchUser !== null) {
            let isExist = await _models2.default.User.validPassword(fetchUser, req.body);
            if (isExist) {
                await _models2.default.User.update({
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

                let accessToken = _jsonwebtoken2.default.sign(payload, _config.JWT_CONFIG.secret, _config.JWT_CONFIG.options);
                let refreshToken = _jsonwebtoken2.default.sign(payload, _config.REFRESH_TOKEN.secret, _config.REFRESH_TOKEN.options);

                let nomineeApplications = await _models2.default.NomineeApplication.findAll({
                    where: {
                        [Op.or]: [{ nominator_ref: fetchUser.id }, { user_profile_ref: fetchUser.id }]
                    },
                    include: [{
                        model: _models2.default.NomineeApplicationSurvey,
                        as: "nomineeApplicationSurveys"
                    }]
                });
                if (nomineeApplications.length === 0) {
                    return res.status(200).json({
                        status: "success",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        payload: isExist,
                        message: "User Logged in successfully"
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        payload: isExist,
                        nomineeApplications: nomineeApplications,
                        message: "User Logged in successfully"
                    });
                }
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
        });
    }
};

exports.forgot_password = async (req, res, next) => {
    try {
        const { email } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email
            },
            include: {
                model: _models2.default.UserProfile,
                as: "userProfile"
            }
        });
        if (fetchUser !== null) {
            /* 
                // Need to implement nodemailer
                * Verification Code will be sent to registered email for setting password
            */
            let code = _constants.NODE_ENV === 'development' ? '000000' : await _userHelper2.default.createUniqueVerificationCode();
            await _models2.default.User.update({
                verification_code: code
            }, {
                where: {
                    email: email
                },
                returning: true
            });

            let message = {};
            message.code = code;
            _constants.NODE_ENV === 'development' ? console.log(' <=== OTP email can send in production mode ===> ') : await (0, _emailUtils.send_mail)("OTP", email, fetchUser.userProfile.full_name, message);

            return res.status(200).json({
                status: "success",
                payload: {},
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
        });
    }
};

exports.verifying_account = async (req, res, next) => {
    try {
        const { email, password, verification_code } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email,
                verification_code: verification_code
            }
        });
        if (fetchUser !== null) {
            await _models2.default.User.update({
                verification_code: null,
                status: "ACTIVE"
            }, {
                where: {
                    id: fetchUser.id
                }
            });
            return res.status(200).json({
                status: "success",
                payload: {},
                message: "Password setted successfully"
            });
        } else {
            return res.status(500).json({
                status: "failed",
                payload: {},
                message: "Password failed while setting"
            });
        }
    } catch (error) {
        console.log("Error at verifying_account method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Password failed while setting"
        });
    }
};

exports.resetting_password = async (req, res, next) => {
    try {
        const { email, password, verification_code } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email,
                verification_code: verification_code
            }
        });
        if (fetchUser !== null) {
            await _models2.default.User.update({
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
            });
        }
    } catch (error) {
        console.log("Error at resetting_password method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User failed while creating"
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        let fetchUser = await _models2.default.User.findOne({
            where: {
                id: req.userData.user_id,
                status: {
                    [Op.or]: ['ACTIVE', 'PENDING']
                }
            },
            include: [{
                model: _models2.default.UserProfile,
                as: 'userProfile'
            }, {
                model: _models2.default.UserRole,
                as: 'userRoles',
                where: {
                    is_default: true
                },
                required: false,
                include: [{
                    model: _models2.default.Role,
                    as: 'role'
                }]
            }]
        });
        if (fetchUser !== null) {

            await _models2.default.User.update({
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

            let accessToken = _jsonwebtoken2.default.sign(payload, _config.JWT_CONFIG.secret, _config.JWT_CONFIG.options);
            let refreshToken = _jsonwebtoken2.default.sign(payload, _config.REFRESH_TOKEN.secret, _config.REFRESH_TOKEN.options);

            let nomineeApplications = await _models2.default.NomineeApplication.findAll({
                where: {
                    [Op.or]: [{ nominator_ref: fetchUser.id }, { user_profile_ref: fetchUser.id }]
                },
                include: [{
                    model: _models2.default.NomineeApplicationSurvey,
                    as: "nomineeApplicationSurveys"
                }]
            });
            if (nomineeApplications.length === 0) {
                return res.status(200).json({
                    status: "success",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    payload: fetchUser,
                    message: "User authenticated successfully"
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    payload: fetchUser,
                    nomineeApplications: nomineeApplications,
                    message: "User authenticated successfully"
                });
            }
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
        });
    }
};

exports.create_new_user_by_admin = async (req, res, next) => {
    try {
        const { full_name, email, password, mobile_number, pan_number, role_code, status, designation, description } = req.body;
        let fetchUser = await _models2.default.User.findOne({
            where: {
                email: email
            }
        });

        if (fetchUser !== null) {
            return res.status(200).json({
                status: "success",
                payload: {},
                message: "User Created by Admin already exist"
            });
        } else {
            /* 
                * Password will be sent to registered email for logging in
            */
            const generatedPassword = _constants.NODE_ENV === 'development' ? 'Password123' : await _userHelper2.default.createPassword(8);
            // console.log("generatedPassword =====> " + generatedPassword);

            let newUser = await _models2.default.User.create({
                email: email,
                password: generatedPassword,
                status: "ACTIVE"
            });

            let newUserProfile = await _models2.default.UserProfile.create({
                user_id: newUser.id,
                full_name, email, mobile_number, pan_number, status
            });
            let findRole = await _models2.default.Role.findOne({
                where: {
                    code: role_code
                }
            });
            let findUserRole = await _models2.default.UserRole.findOne({
                where: {
                    user_id: newUser.id,
                    role_id: findRole.id
                }
            });
            if (findUserRole === null) {
                await _models2.default.UserRole.create({
                    user_id: newUser.id,
                    role_id: findRole.id,
                    is_default: true,
                    status: "ACTIVE"
                });

                let newJury = await _models2.default.Jury.create({
                    user_profile_id: newUserProfile.id, description, designation, status: "ACTIVE"
                });
                console.log(req.file);
                if (req.file !== undefined) {
                    await (0, _attachmentServices.addAttachment)(req.file, JURIES_BUCKET_NAME, newJury.id, null);
                    newJury = await _models2.default.Jury.findOne({ where: { id: newJury.id } });
                }

                let message = {};
                message.password = generatedPassword;
                _constants.NODE_ENV === 'development' ? console.log(' <=== Password email can send in production mode ===> ') : await (0, _emailUtils.send_mail)("PWD", email, full_name, message);

                return res.status(200).json({
                    status: "success",
                    payload: {},
                    message: "Created User by admin successfully, Password sent to registered email"
                });
            } else {
                return res.status(500).json({
                    status: "failed",
                    payload: {},
                    message: "User created by Admin failed while creating"
                });
            }
        }
    } catch (error) {
        console.log("Error at create_new_user_by_admin method - POST / :" + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "User created by Admin failed while creating"
        });
    }
};