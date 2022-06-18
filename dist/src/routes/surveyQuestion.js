'use strict';

var _surveyQuestion = require('../controllers/surveyQuestion');

var _surveyQuestion2 = _interopRequireDefault(_surveyQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of surveyQuestions
  * Uses: To display surveyQuestions
  * URl:localhost:3000/survey-questions
*/

router.get('/', _surveyQuestion2.default.fetch_all_survey_question);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of surveyQuestion by id
  * Uses: To display surveyQuestion by id
  * URl:localhost:3000/survey-questions/1
*/

router.get('/:id', _surveyQuestion2.default.fetch_survey_question_by_id);

/*
  * Method: POST
  * Body Parameters: master_sub_category_id, code, question, weightage, is_required, status
  * Return: JSON of surveyQuestion
  * Uses: To save surveyQuestion
  * URl:localhost:3000/survey-questions
*/

router.post('/', _surveyQuestion2.default.create_new_survey_question);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters : master_sub_category_id, code, question, weightage, status
  * Return: JSON of surveyQuestion by id
  * Uses: To display surveyQuestion by id
  * URl:localhost:3000/survey-questions/1
 */

router.put('/:id', _surveyQuestion2.default.update_survey_question);

/*
  * Method: POST
  * Body Parameters :  master_sub_category_id, code, question, weightage, is_required, status, options
  * Return: JSON of surveyQuestion
  * Uses: To save surveyQuestion
  * URl:localhost:3000/survey-questions/with-options
*/

router.post('/with-options', _surveyQuestion2.default.create_new_survey_question_with_options);

/*
  * Method: GET
  * Parameter: master_sub_category_id
  * Return: JSON of surveyQuestion by master_sub_category_id
  * Uses: To display surveyQuestion by master_sub_category_id
  * URl:localhost:3000/survey-questions/master_sub_category_id/1
*/

router.get('/master_sub_category_id/:master_sub_category_id', _surveyQuestion2.default.fetch_survey_question_by_master_sub_category_id);

module.exports = router;