'use strict';

var _masterSubCategory = require('../controllers/masterSubCategory');

var _masterSubCategory2 = _interopRequireDefault(_masterSubCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of masterSubCategory
 * Uses: To display masterSubCategory
 * URl:localhost:3000/master-sub-categories
 */
router.get('/', _masterSubCategory2.default.fetch_all_masterSubCategories);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of masterSubCategory by id
 * Uses: To display masterSubCategory by id
 * URl:localhost:3000/master-sub-categories/1
 */

router.get('/:id', _masterSubCategory2.default.fetch_masterSubCategory_by_id);

/*
  * Method: POST
  * Body Parameters : master_category_id, code, name, description, status
   * Return: JSON of masterSubCategory
  * Uses: To save masterSubCategory
  *URl:localhost:3000/master-sub-categories
  */
router.post('/', _masterSubCategory2.default.create_new_masterSubCategory);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters :  master_category_id, code, name, description, status
 * Return: JSON of masterSubCategory by id
 * Uses: To display masterSubCategory by id
 * URl:localhost:3000/master-sub-categories/1
 */
router.put('/:id', _masterSubCategory2.default.update_masterSubCategory);

module.exports = router;