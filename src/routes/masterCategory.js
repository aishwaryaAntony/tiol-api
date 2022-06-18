var express = require('express');
var router = express.Router();
import masterCategoryController from '../controllers/masterCategory';

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of masterCategory
  * Uses: To display masterCategory
  * URl:localhost:3000/master-categories
 */
router.get('/', masterCategoryController.fetch_all_master_category);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of masterCategory by id
  * Uses: To display masterCategory by id
  * URl:localhost:3000/master-categories/1
*/
router.get('/:id', masterCategoryController.fetch_master_category_by_id);


/*
  * Method: POST
  * Body Parameters : name, description, status 
  * Return: JSON of masterCategory
  * Uses: To save masterCategory
  * URl:localhost:3000/master-categories
*/
router.post('/', masterCategoryController.create_new_master_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : name, description, status 
 * Return: JSON of updated masterCategory
 * Uses: To update masterCategory
 * URl:localhost:3000/master-categories/1
 */
router.put('/:id', masterCategoryController.update_master_category);

module.exports = router;
