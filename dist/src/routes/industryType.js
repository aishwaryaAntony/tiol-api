'use strict';

var _industryType = require('../controllers/industryType');

var _industryType2 = _interopRequireDefault(_industryType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of industryType
 * Uses: To display industryTypes
 * URl:localhost:3000/industryTypes
 */

router.get('/', _industryType2.default.fetch_all_industry_types);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of industryType by id
 * Uses: To display industryType by id
 * URl:localhost:3000/industryTypes/1
 */

router.get('/:id', _industryType2.default.fetch_industry_type_by_id);

/*
  * Method: POST
  * Body Parameters : code, name, status
  * Return: JSON of industryType
  * Uses: To save industryType
  *URl:localhost:3000/industryTypes
  */

router.post('/', _industryType2.default.create_new_industry_type);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : code, name, status 
 * Return: JSON of industryType by id
 * Uses: To display industryType by id
 * URl:localhost:3000/industryTypes/1
 */
router.put('/:id', _industryType2.default.update_industry_type);

module.exports = router;