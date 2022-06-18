var express = require('express');
var router = express.Router();
import nomineeApplicationSurveyController from '../controllers/nomineeApplicationSurvey';

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplicationSurvey
  * Uses: To display nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys
 */

router.get('/', nomineeApplicationSurveyController.fetch_all_nominee_application_survey);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of nomineeApplicationSurvey by id
  * Uses: To display nomineeApplicationSurvey by id
  * URL:localhost:3000/nominee-application-surveys/1
*/

router.get('/:id', nomineeApplicationSurveyController.fetch_nominee_application_survey_by_id);

/*
  * Method: POST
  * Body Parameters : nominee_application_id, award_survey_question_id, award_survey_option_id, status
  * Return: JSON consist payload as object of created nomineeApplicationSurvey
  * Uses: To save nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys
*/

router.post('/', nomineeApplicationSurveyController.create_new_nominee_application_survey);

/*
  * Method: POST
  * Body Parameters : nominee_application_id, questionOptions
  * Return: JSON consist payload as array of nomineeApplicationSurvey
  * Uses: To bulk save nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys/bulk
 */

router.post('/bulk', nomineeApplicationSurveyController.bulk_create_nominee_application_survey);

router.get('/nominated-application/:id', nomineeApplicationSurveyController.fetch_nominee_application_survey_by_nominee_application_id);


module.exports = router;