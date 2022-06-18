'use strict';

var _awardSubCategory = require('../controllers/awardSubCategory');

var _awardSubCategory2 = _interopRequireDefault(_awardSubCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of awardSubCategory
 * Uses: To display awardSubCategory 
 * URl:localhost:3000/award-sub-categories
 */
router.get('/', _awardSubCategory2.default.fetch_all_award_sub_categories);

/*
* Method: GET
* Parameter: id
* Return: JSON of awardSubCategory by id
* Uses: To display awardSubCategory by id
* URl:localhost:3000/award-sub-categories/1
*/
router.get('/:id', _awardSubCategory2.default.fetch_award_sub_categories_by_id);

/*
  * Method: POST
  * Body Parameters : award_season_id, award_category_id, code, name, description, status
  * Optional Body Parameters : master_category_ref
  * Return: JSON of awardSubCategory
  * Uses: To save awardSubCategory
  * URl:localhost:3000/award-sub-categories/1
  */
router.post('/', _awardSubCategory2.default.create_new_award_sub_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : award_season_id, award_category_id, code, name, description, status 
 * Optional Body Parameters : master_category_ref
 * Return: JSON of awardSubCategory by id
 * Uses: To display awardSubCategory by id
 * URl:localhost:3000/award-sub-categories/1
 */
router.put('/:id', _awardSubCategory2.default.update_award_sub_category);
module.exports = router;