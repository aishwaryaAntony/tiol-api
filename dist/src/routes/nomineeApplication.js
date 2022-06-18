'use strict';

var _nomineeApplication = require('../controllers/nomineeApplication');

var _nomineeApplication2 = _interopRequireDefault(_nomineeApplication);

var _checkAuth = require('../middlewares/check-auth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplication
  * Uses: To display nomineeApplication
  * URl:localhost:3000/nominee-applications
*/

router.get('/', _nomineeApplication2.default.fetch_all_nominee_application);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of nomineeApplication by id
  * Uses: To display nomineeApplication by id
  * URl: localhost:3000/nominee-applications/1
*/

router.get('/:id', _nomineeApplication2.default.fetch_nominee_application_by_id);

/*
  * Method: POST
  * Body Parameters: award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication
  * Uses: To save nomineeapplication
  * URl: localhost:3000/nominee-applications
*/

router.post('/', _nomineeApplication2.default.create_new_nominee_application);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters:  award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication by id
  * Uses: To display nomineeapplication by id
  * URl: localhost:3000/nominee-applications/1
*/

router.put('/:id', _nomineeApplication2.default.update_nominee_application);

/*
  * Method: POST
  * Body Parameters : award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication
  * Uses: To save nomineeapplication
  * URl:localhost:3000/nominee-applications
*/

router.post('/find-or-create', _nomineeApplication2.default.find_or_create_new_nominee_application);

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplication by user_id
  * Uses: To display nomineeApplication by user_id
  * URl: localhost:3000/nominee-applications/user/nominations
*/

router.get('/user/nominations', _checkAuth2.default, _nomineeApplication2.default.fetch_all_nominee_application_by_user_id);

module.exports = router;