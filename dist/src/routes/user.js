"use strict";

var _user = require("../controllers/user");

var _user2 = _interopRequireDefault(_user);

var _checkAuth = require("../middlewares/check-auth");

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _attachmentServices = require("../utils/attachmentServices");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
   * Method: GET
   * Parameter: None
   * Return: JSON of user
   * Uses: To display user
   * URl:localhost:3000/users
*/
router.get("/", _user2.default.get_all_user);

/*
   * Method: POST
   * Body Parameter: first_name, last_name, date_of_birth, gender, email, mobile_number, pan_number, role_code, status
   * Option Body Parameter: first_name, last_name, date_of_birth, gender, pan_number
   * Return: JSON of user
   * Uses: To register a user
   * URl:localhost:3000/users/sign-up
*/
router.post("/sign-up", _user2.default.create_new_user);

/*
   * Method: POST
   * Body Parameter: email, password
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To send email to user with verification code for logging In
   * URl:localhost:3000/users/login
*/
router.post("/login", _user2.default.login);

/*
   * Method: POST
   * Body Parameter: email
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To send email to user with verification code for resetting password
   * URl:localhost:3000/users/forgot-password
*/
router.post("/forgot-password", _user2.default.forgot_password);

/*
   * Method: POST
   * Body Parameter: email, verification_code
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To set password, after signup
   * URl:localhost:3000/users/setting-password
*/
router.post("/verifying-account", _user2.default.verifying_account);

/*
   * Method: POST
   * Body Parameter: email, password, verification_code
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To reset password
   * URl:localhost:3000/users/resetting-password
*/
router.post("/resetting-password", _user2.default.resetting_password);

/*
   * Method: GET
   * Parameter: None
   * Option Body Parameter: None
   * Return: JSON consist of message, status, accessToken, refreshToken, payload consist of userData
   * Uses: To authenticate user
   * URl:localhost:3000/users/authenticate
*/
router.get("/authenticate", _checkAuth2.default, _user2.default.authenticate);

/*
   * Method: POST
   * Body Parameter: first_name, last_name, date_of_birth, gender, email, mobile_number, pan_number, role_code, status
   * Option Body Parameter: first_name, last_name, date_of_birth, gender, pan_number
   * Return: JSON of user
   * Uses: To register a user
   * URl:localhost:3000/users
*/
router.post("/", _attachmentServices.upload.single('file'), _user2.default.create_new_user_by_admin);

module.exports = router;