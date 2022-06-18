'use strict';

var _masterCategory = require('../controllers/masterCategory');

var _masterCategory2 = _interopRequireDefault(_masterCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
  * Method: GET
  * Parameter: None
  * Return: JSON of masterCategory
  * Uses: To display masterCategory
  * URl:localhost:3000/master-categories
 */
router.get('/', _masterCategory2.default.fetch_all_master_category);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of masterCategory by id
  * Uses: To display masterCategory by id
  * URl:localhost:3000/master-categories/1
*/
router.get('/:id', _masterCategory2.default.fetch_master_category_by_id);

/*
  * Method: POST
  * Body Parameters : name, description, status 
  * Return: JSON of masterCategory
  * Uses: To save masterCategory
  * URl:localhost:3000/master-categories
*/
router.post('/', _masterCategory2.default.create_new_master_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : name, description, status 
 * Return: JSON of updated masterCategory
 * Uses: To update masterCategory
 * URl:localhost:3000/master-categories/1
 */
router.put('/:id', _masterCategory2.default.update_master_category);

module.exports = router;