var express = require('express');
var router = express.Router();
import juryController from "../controllers/jury";
import { upload } from "../utils/attachmentServices";
import adminAuth from '../middlewares/admin-auth'

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of jury
 * Uses: To display jury
 * URl:localhost:3000/juries
 */
router.get("/", juryController.get_all_jury);


/*
 * Method: GET
 * Parameter: id
 * Return: JSON of jury by id
 * Uses: To display jury by id
 * URl:localhost:3000/juries/1
 */
router.get("/:id", juryController.get_jury_by_id);


/*
  * Method: POST
  * Body Parameters : user_profile_id, description, designation, filename, mongo_id, status, bio, priority
  * Optional Body Parameters : filename, mongo_id
  * Return: JSON of added jury
  * Uses: To save jury
  * URl:localhost:3000/juries
  */
router.post("/", adminAuth, upload.single('file'), juryController.insert_jury);


/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : user_profile_id, description, designation, filename, mongo_id, status, bio, priority
 * Optional Body Parameters : filename, mongo_id
 * Return: JSON of jury by id
 * Uses: To display jury by id
 * URl:localhost:3000/juries/1
 */
router.put("/:id", adminAuth, upload.single('file'), juryController.update_jury_by_id);

module.exports = router;