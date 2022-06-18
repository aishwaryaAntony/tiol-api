var express = require('express');
var router = express.Router();
import masterSubCategoryController from '../controllers/masterSubCategory';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of masterSubCategory
 * Uses: To display masterSubCategory
 * URl:localhost:3000/master-sub-categories
 */
router.get('/', masterSubCategoryController.fetch_all_masterSubCategories);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of masterSubCategory by id
 * Uses: To display masterSubCategory by id
 * URl:localhost:3000/master-sub-categories/1
 */

router.get('/:id', masterSubCategoryController.fetch_masterSubCategory_by_id);

/*
  * Method: POST
  * Body Parameters : master_category_id, code, name, description, status
   * Return: JSON of masterSubCategory
  * Uses: To save masterSubCategory
  *URl:localhost:3000/master-sub-categories
  */
router.post('/', masterSubCategoryController.create_new_masterSubCategory);


/*
 * Method: PUT
 * Parameter: id
 * Body Parameters :  master_category_id, code, name, description, status
 * Return: JSON of masterSubCategory by id
 * Uses: To display masterSubCategory by id
 * URl:localhost:3000/master-sub-categories/1
 */
router.put('/:id', masterSubCategoryController.update_masterSubCategory);

module.exports = router;