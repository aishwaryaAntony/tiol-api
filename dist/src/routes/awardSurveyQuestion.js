"use strict";

var _awardSurveyQuestion = require("../controllers/awardSurveyQuestion");

var _awardSurveyQuestion2 = _interopRequireDefault(_awardSurveyQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: award_season_id
 * Return: JSON of award survey questions by award_season_id
 * Uses: To display award survey questions
 * URl:localhost:3000/award-survey-questions/1
 */

router.get("/:award_season_id", _awardSurveyQuestion2.default.get_award_survey_question_by_award_season_id);

router.post('/', _awardSurveyQuestion2.default.create_new_award_survey_question);

module.exports = router;