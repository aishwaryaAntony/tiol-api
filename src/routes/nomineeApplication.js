var express = require('express');
var router = express.Router();
import nomineeApplicationController from '../controllers/nomineeApplication';
import checkAuth from "../middlewares/check-auth";
import adminAuth from '../middlewares/admin-auth'

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplication
  * Uses: To display nomineeApplication
  * URl:localhost:3000/nominee-applications
*/

router.get('/', nomineeApplicationController.fetch_all_nominee_application);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of nomineeApplication by id
  * Uses: To display nomineeApplication by id
  * URl: localhost:3000/nominee-applications/1
*/

router.get('/:id', nomineeApplicationController.fetch_nominee_application_by_id);

/*
  * Method: POST
  * Body Parameters: award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication
  * Uses: To save nomineeapplication
  * URl: localhost:3000/nominee-applications
*/

router.post('/', nomineeApplicationController.create_new_nominee_application);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters:  award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication by id
  * Uses: To display nomineeapplication by id
  * URl: localhost:3000/nominee-applications/1
*/

router.put('/:id', nomineeApplicationController.update_nominee_application);

/*
  * Method: POST
  * Body Parameters : award_season_id, user_profile_ref, nominator_ref, award_sub_category_id, nominee_name, pan_number, company_name, state, city, postal_address, pin_code,
    industry_type, nominee_business, status
  * Return: JSON of nomineeapplication
  * Uses: To save nomineeapplication
  * URl:localhost:3000/nominee-applications
*/

router.post('/find-or-create', nomineeApplicationController.find_or_create_new_nominee_application);

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplication by user_id
  * Uses: To display nomineeApplication by user_id
  * URl: localhost:3000/nominee-applications/user/nominations
*/

router.get('/user/nominations', checkAuth, nomineeApplicationController.fetch_all_nominee_application_by_user_id);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters: status
  * Return: JSON of nomineeapplication by id
  * Uses: To display nomineeapplication by id
  * URl: localhost:3000/nominee-applications/1
*/

router.put('/validate/:id', adminAuth, nomineeApplicationController.update_nominee_application_status);

router.get('/application/:application_sequence_number', checkAuth, nomineeApplicationController.fetch_nominee_application_by_sequence_number)


/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplication
  * Uses: To display nomineeApplication
  * URl:localhost:3000/nominee-applications/submitted/applications
*/

router.get('/submitted/applications', nomineeApplicationController.fetch_submitted_nominee_application);

module.exports = router;