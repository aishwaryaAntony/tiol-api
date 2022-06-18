"use strict";

var _jury = require("../controllers/jury");

var _jury2 = _interopRequireDefault(_jury);

var _attachmentServices = require("../utils/attachmentServices");

var _adminAuth = require("../middlewares/admin-auth");

var _adminAuth2 = _interopRequireDefault(_adminAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of jury
 * Uses: To display jury
 * URl:localhost:3000/juries
 */
router.get("/", _jury2.default.get_all_jury);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of jury by id
 * Uses: To display jury by id
 * URl:localhost:3000/juries/1
 */
router.get("/:id", _jury2.default.get_jury_by_id);

/*
  * Method: POST
  * Body Parameters : user_profile_id, description, designation, filename, mongo_id, status
  * Optional Body Parameters : filename, mongo_id
  * Return: JSON of added jury
  * Uses: To save jury
  * URl:localhost:3000/juries
  */
router.post("/", _adminAuth2.default, _attachmentServices.upload.single('file'), _jury2.default.insert_jury);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : user_profile_id, description, designation, filename, mongo_id, status
 * Optional Body Parameters : filename, mongo_id
 * Return: JSON of jury by id
 * Uses: To display jury by id
 * URl:localhost:3000/juries/1
 */
router.put("/:id", _adminAuth2.default, _attachmentServices.upload.single('file'), _jury2.default.update_jury_by_id);

module.exports = router;