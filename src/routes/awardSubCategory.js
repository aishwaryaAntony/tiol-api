var express = require('express');
var router = express.Router();
import awardSubCategoryController from '../controllers/awardSubCategory';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of awardSubCategory
 * Uses: To display awardSubCategory 
 * URl:localhost:3000/award-sub-categories
 */
router.get('/', awardSubCategoryController.fetch_all_award_sub_categories);

/*
* Method: GET
* Parameter: id
* Return: JSON of awardSubCategory by id
* Uses: To display awardSubCategory by id
* URl:localhost:3000/award-sub-categories/1
*/
router.get('/:id', awardSubCategoryController.fetch_award_sub_categories_by_id);

/*
  * Method: POST
  * Body Parameters : award_season_id, award_category_id, code, name, description, status
  * Optional Body Parameters : master_category_ref
  * Return: JSON of awardSubCategory
  * Uses: To save awardSubCategory
  * URl:localhost:3000/award-sub-categories/1
  */
router.post('/', awardSubCategoryController.create_new_award_sub_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : award_season_id, award_category_id, code, name, description, status 
 * Optional Body Parameters : master_category_ref
 * Return: JSON of awardSubCategory by id
 * Uses: To display awardSubCategory by id
 * URl:localhost:3000/award-sub-categories/1
 */
router.put('/:id', awardSubCategoryController.update_award_sub_category);


router.get('/season/sub-category', awardSubCategoryController.fetch_all_award_sub_categories_by_season);

module.exports = router;
