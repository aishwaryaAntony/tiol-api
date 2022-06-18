'use strict';

var _awardCategory = require('../controllers/awardCategory');

var _awardCategory2 = _interopRequireDefault(_awardCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of awardCategory
 * Uses: To display awardCategory
 * URl:localhost:3000/awardCategories
 */
router.get('/', _awardCategory2.default.fetch_all_award_categories);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of awardCategory by id
 * Uses: To display awardCategory by id
 * URl:localhost:3000/awardCategories/1
 */
router.get('/:id', _awardCategory2.default.fetch_award_category_by_id);

/*
  * Method: POST
  * Body Parameters : award_season_id, code, name, description, status
  * Optional Body Parameters : master_category_ref
  * Return: JSON of added awardCategory
  * Uses: To save awardCategory
  * URl:localhost:3000/awardCategories
  */
router.post('/', _awardCategory2.default.create_new_award_category);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : award_season_id, code, name, description, status 
 * Optional Body Parameters : master_category_ref
 * Return: JSON of awardCategory by id
 * Uses: To display awardCategory by id
 * URl:localhost:3000/awardCategories/1
 */
router.put('/:id', _awardCategory2.default.update_award_category);
module.exports = router;