var express = require('express');
var router = express.Router();

import selectedNomineeController from "../controllers/selectedNominee";

/*
    * Method: GET
    * Parameter: id
    * Return: JSON of selected-nominee by id
    * Uses: To display selected-nominee by id
    * URl:localhost:3000/selected-nominees/1
*/

router.get('/:id', selectedNomineeController.fetch_selected_nominee_by_id);

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of selected_nominee
 * Uses: To display selected_nominee
 * URl:localhost:3000/selected-nominees
 */
router.get('/', selectedNomineeController.fetch_all_selected_nominees);


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of selected_nominee
 * Uses: To display selected_nominee by using season id and sub category id
 * URl:localhost:3000/selected-nominees/nominees/:seasonId/:subCategoryId
 */
router.get('/nominees/:seasonId/:subCategoryId', selectedNomineeController.fetch_all_selected_nominees_by_sub_category);

/*
    * Method: GET
    * Parameter: id
    * Return: JSON of selected-nominee by nomination_unique_id
    * Uses: To display selected-nominee by nomination_unique_id
    * URl:localhost:3000/selected-nominees/nomination_unique_id/n2fBUmHzh6B60USTQjWFwwC1hZoL8i6K 
*/

router.get('/nomination_unique_id/:nomination_unique_id', selectedNomineeController.fetch_selected_nominee_by_nomination_unique_id);

module.exports = router;