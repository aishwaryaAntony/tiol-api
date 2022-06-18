'use strict';

var _blog = require('../controllers/blog');

var _blog2 = _interopRequireDefault(_blog);

var _attachmentServices = require('../utils/attachmentServices');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of Blog
 * Uses: To display Blog
 * URl:localhost:3000/blogs
 */

router.get('/', _blog2.default.fetch_all_blog);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of Blog by id
 * Uses: To display Blog by id
 * URl:localhost:3000/blogs/1
 */

router.get('/:id', _blog2.default.fetch_blog_by_id);
/*
  * Method: POST
  * Body Parameters : user_profile_id, description, title, blog_creator, content, status, file_name, mongo_id
  * Optional Body Parameters : file_name, mongo_id
  * Return: JSON of added jury
  * Uses: To save Blog
  * URl:localhost:3000/blogs
  */

router.post('/', _attachmentServices.upload.single("file"), _blog2.default.create_new_blog);
/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : user_profile_id, description, title, blog_creator, content, status, file_name, mongo_id
 * Optional Body Parameters : file_name, mongo_id
 * Return: JSON of Blog by id
 * Uses: To display Blog by id
 * URl:localhost:3000/blogs/1
 */

router.put('/:id', _attachmentServices.upload.single("file"), _blog2.default.update_blog);

module.exports = router;