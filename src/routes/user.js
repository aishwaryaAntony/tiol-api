var express = require('express');
var router = express.Router();
import userController from "../controllers/user";
import checkAuth from "../middlewares/check-auth";
import { upload } from "../utils/attachmentServices";

/*
   * Method: GET
   * Parameter: None
   * Return: JSON of user
   * Uses: To display user
   * URl:localhost:3000/users
*/
router.get("/", userController.getAllUser);

/*
   * Method: POST
   * Body Parameter: full_name, email, mobile_number, pan_number, role_code, status
   * Option Body Parameter: full_name, pan_number
   * Return: JSON of user
   * Uses: To register a user
   * URl:localhost:3000/users/sign-up
*/
router.post("/sign-up", userController.signUp);

/*
   * Method: POST
   * Body Parameter: email, password
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To send email to user with verification code for logging In
   * URl:localhost:3000/users/login
*/
router.post("/login", userController.login);

/*
   * Method: POST
   * Body Parameter: email
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To send email to user with verification code for resetting password
   * URl:localhost:3000/users/forgot-password
*/
router.post("/forgot-password", userController.forgotPassword);

/*
   * Method: POST
   * Body Parameter: email, verification_code
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To set password, after signup
   * URl:localhost:3000/users/setting-password
*/
router.post("/verifying-account", userController.verifyingAccount);

/*
   * Method: POST
   * Body Parameter: email, password, verification_code
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To reset password
   * URl:localhost:3000/users/resetting-password
*/
router.post("/resetting-password", userController.resettingPassword);

/*
   * Method: GET
   * Parameter: None
   * Option Body Parameter: None
   * Return: JSON consist of message, status, accessToken, refreshToken, payload consist of userData
   * Uses: To authenticate user
   * URl:localhost:3000/users/authenticate
*/
router.get("/authenticate", checkAuth, userController.authenticate);

/*
   * Method: POST
   * Body Parameter: full_name, email, mobile_number, pan_number, role_code, status
   * Option Body Parameter: full_name, pan_number, (for jury only - file, designation, description, bio)
   * Return: JSON of user
   * Uses: To register a user
   * URl:localhost:3000/users
*/
router.post("/", upload.single('file'), userController.createNewUserByAdmin);

/*
   * Method: POST
   * Body Parameter: password, new_password
   * Option Body Parameter: None
   * Return: JSON consist of message, status
   * Uses: To change password
   * URl:localhost:3000/users/change-password
*/
router.post("/change-password", checkAuth, userController.changePassword);

/*
   * Method: PUT
   * Body Parameter: full_name, email, mobile_number, pan_number, role_code, status
   * Option Body Parameter: full_name, pan_number, (for jury only - file, designation, description, bio)
   * Return: JSON of user
   * Uses: To update a user
   * URl:localhost:3000/users/1
*/
router.put("/:id", upload.single('file'), userController.updateUserByAdmin);

module.exports = router;