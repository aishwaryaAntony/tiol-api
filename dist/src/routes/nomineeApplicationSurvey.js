'use strict';

var _nomineeApplicationSurvey = require('../controllers/nomineeApplicationSurvey');

var _nomineeApplicationSurvey2 = _interopRequireDefault(_nomineeApplicationSurvey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
  * Method: GET
  * Parameter: None
  * Return: JSON of nomineeApplicationSurvey
  * Uses: To display nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys
 */

router.get('/', _nomineeApplicationSurvey2.default.fetch_all_nominee_application_survey);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of nomineeApplicationSurvey by id
  * Uses: To display nomineeApplicationSurvey by id
  * URL:localhost:3000/nominee-application-surveys/1
*/

router.get('/:id', _nomineeApplicationSurvey2.default.fetch_nominee_application_survey_by_id);

/*
  * Method: POST
  * Body Parameters : nominee_application_id, award_survey_question_id, award_survey_option_id, status
  * Return: JSON consist payload as object of created nomineeApplicationSurvey
  * Uses: To save nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys
*/

router.post('/', _nomineeApplicationSurvey2.default.create_new_nominee_application_survey);

/*
  * Method: POST
  * Body Parameters : nominee_application_id, questionOptions
  * Return: JSON consist payload as array of nomineeApplicationSurvey
  * Uses: To bulk save nomineeApplicationSurvey
  * URL:localhost:3000/nominee-application-surveys/bulk
 */

router.post('/bulk', _nomineeApplicationSurvey2.default.bulk_create_nominee_application_survey);

module.exports = router;