var express = require('express');
var router = express.Router();
import awardCategoryController from '../controllers/awardCategory';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of awardCategory
 * Uses: To display awardCategory
 * URl:localhost:3000/awardCategories
 */
router.get('/', awardCategoryController.fetch_all_award_categories);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of awardCategory by id
 * Uses: To display awardCategory by id
 * URl:localhost:3000/awardCategories/1
 */
router.get('/:id', awardCategoryController.fetch_award_category_by_id);

/*
  * Method: POST
  * Body Parameters : award_season_id, code, name, description, status
  * Optional Body Parameters : master_category_ref
  * Return: JSON of added awardCategory
  * Uses: To save awardCategory
  * URl:localhost:3000/awardCategories
  */
router.post('/', awardCategoryController.create_new_award_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : award_season_id, code, name, description, status 
 * Optional Body Parameters : master_category_ref
 * Return: JSON of awardCategory by id
 * Uses: To display awardCategory by id
 * URl:localhost:3000/awardCategories/1
 */
router.put('/:id', awardCategoryController.update_award_category);
module.exports = router;
