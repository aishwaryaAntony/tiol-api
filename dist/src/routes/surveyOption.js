'use strict';

var _surveyOption = require('../controllers/surveyOption');

var _surveyOption2 = _interopRequireDefault(_surveyOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of surveyOption
 * Uses: To display surveyOption
 * URl:localhost:3000/survey-options
 */

router.get('/', _surveyOption2.default.fetch_all_surveyOptions);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of surveyOption by id
 * Uses: To display surveyOption by id
 * URl:localhost:3000/survey-options/1
 */
router.get('/:id', _surveyOption2.default.fetch_surveyOption_by_id);

/*
  * Method: POST
  * Body Parameters : survey_question_id, answer, weightage, status
   * Return: JSON of surveyOption
  * Uses: To save surveyOption
 URl:localhost:3000/survey-options
  */
router.post('/', _surveyOption2.default.create_new_surveyOption);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters :survey_question_id, answer, weightage, status
 * Return: JSON of surveyOption by id
 * Uses: To display surveyOption by id
 * URl:localhost:3000/survey-options/1
 */
router.put('/:id', _surveyOption2.default.update_surveyOption);

module.exports = router;