var express = require('express');
var router = express.Router();
import surveyOptionController from '../controllers/surveyOption';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of surveyOption
 * Uses: To display surveyOption
 * URl:localhost:3000/survey-options
 */

router.get('/', surveyOptionController.fetch_all_surveyOptions);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of surveyOption by id
 * Uses: To display surveyOption by id
 * URl:localhost:3000/survey-options/1
 */
router.get('/:id', surveyOptionController.fetch_surveyOption_by_id);

/*
  * Method: POST
  * Body Parameters : survey_question_id, answer, weightage, status
   * Return: JSON of surveyOption
  * Uses: To save surveyOption
 URl:localhost:3000/survey-options
  */
router.post('/', surveyOptionController.create_new_surveyOption);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters :survey_question_id, answer, weightage, status
 * Return: JSON of surveyOption by id
 * Uses: To display surveyOption by id
 * URl:localhost:3000/survey-options/1
 */
router.put('/:id', surveyOptionController.update_surveyOption);

module.exports = router;