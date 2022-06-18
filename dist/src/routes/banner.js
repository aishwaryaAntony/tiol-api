'use strict';

var _banner = require('../controllers/banner');

var _banner2 = _interopRequireDefault(_banner);

var _attachmentServices = require('../utils/attachmentServices');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of banner
 * Uses: To display banner
 * URl:localhost:3000/banners
 */
router.get('/', _banner2.default.fetch_all_banners);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of banner by id
 * Uses: To display banner by id
 * URl:localhost:3000/banners/1
 */
router.get('/:id', _banner2.default.fetch_banner_by_id);

/*
  * Method: POST
  * Body Parameters : banner_name, user_profile_id, attachment_name, mongo_id, status
  * Optional Body Parameters : mongo_id, attachment_name
  * Return: JSON of added banner
  * Uses: To save banner
  * URl:localhost:3000/banners
  */
router.post('/', _attachmentServices.upload.single('file'), _banner2.default.create_new_banner);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : banner_name, user_profile_id, attachment_type, attachment_name, is_image, mongo_id, status
 * Optional Body Parameters : mongo_id
 * Return: JSON of banner by id
 * Uses: To display banner by id
 * URl:localhost:3000/banners/1
 */
router.put('/:id', _attachmentServices.upload.single('file'), _banner2.default.update_banner);

module.exports = router;