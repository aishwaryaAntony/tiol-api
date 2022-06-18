var express = require('express');
var router = express.Router();
import blogController from '../controllers/blog';
import { upload } from '../utils/attachmentServices';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of Blog
 * Uses: To display Blog
 * URl:localhost:3000/blogs
 */

router.get('/', blogController.fetch_all_blog);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of Blog by id
 * Uses: To display Blog by id
 * URl:localhost:3000/blogs/1
 */

router.get('/:id', blogController.fetch_blog_by_id);
/*
  * Method: POST
  * Body Parameters : user_profile_id, description, title, blog_creator, content, status, file_name, mongo_id
  * Optional Body Parameters : file_name, mongo_id
  * Return: JSON of added jury
  * Uses: To save Blog
  * URl:localhost:3000/blogs
  */

router.post('/', upload.single("file"), blogController.create_new_blog);
/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : user_profile_id, description, title, blog_creator, content, status, file_name, mongo_id
 * Optional Body Parameters : file_name, mongo_id
 * Return: JSON of Blog by id
 * Uses: To display Blog by id
 * URl:localhost:3000/blogs/1
 */

router.put('/:id', upload.single("file"), blogController.update_blog);

module.exports = router;