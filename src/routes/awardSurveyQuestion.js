var express = require('express');
var router = express.Router();
import awardSurveyQuestionController from "../controllers/awardSurveyQuestion";

/*
 * Method: GET
 * Parameter: award_season_id
 * Return: JSON of award survey questions by award_season_id
 * Uses: To display award survey questions
 * URl:localhost:3000/award-survey-questions/1
 */

router.get("/:award_season_id", awardSurveyQuestionController.get_award_survey_question_by_award_season_id);

router.post('/', awardSurveyQuestionController.create_new_award_survey_question);

module.exports = router;