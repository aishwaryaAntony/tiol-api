var express = require('express');
var router = express.Router();
import industryTypeController from '../controllers/industryType';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of industryType
 * Uses: To display industryTypes
 * URl:localhost:3000/industryTypes
 */

router.get('/', industryTypeController.fetch_all_industry_types);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of industryType by id
 * Uses: To display industryType by id
 * URl:localhost:3000/industryTypes/1
 */

router.get('/:id', industryTypeController.fetch_industry_type_by_id);

/*
  * Method: POST
  * Body Parameters : code, name, status
  * Return: JSON of industryType
  * Uses: To save industryType
  *URl:localhost:3000/industryTypes
  */

router.post('/', industryTypeController.create_new_industry_type);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : code, name, status 
 * Return: JSON of industryType by id
 * Uses: To display industryType by id
 * URl:localhost:3000/industryTypes/1
 */
router.put('/:id', industryTypeController.update_industry_type);

module.exports = router;