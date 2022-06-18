var express = require('express');
var router = express.Router();
import awardSeasonController from '../controllers/awardSeason';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of  awardSeason
 * Uses: To display awardSeasons
 * URl:localhost:3000/award-seasons
 */
router.get('/', awardSeasonController.fetch_all_award_seasons);

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of  awardSeason
 * Uses: To fetch current awardSeason
 * URl:localhost:3000/award-seasons/seasons/current
 */
router.get('/seasons/current', awardSeasonController.fetch_current_award_season);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of awardSeason by id
 * Uses: To display awardSeason by id
 * URl:localhost:3000/award-seasons/1
 */
router.get('/:id', awardSeasonController.fetch_award_season_by_id);

/*
  * Method: POST
  * Body Parameters: event_name, description, nomination_start_date, nomination_end_date, voting_start_date, voting_end_date, event_date, status
  * Return: JSON of awardSeason
  * Uses: To save awardSeason
  * URl:localhost:3000/award-seasons
  */
router.post('/', awardSeasonController.create_new_award_season);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters: event_name, description, nomination_start_date, nomination_end_date, voting_start_date, voting_end_date, event_date, status
 * Return: JSON of awardSeason by id
 * Uses: To display awardSeason by id
 * URl:localhost:3000/award-seasons/1
 */
router.put('/:id', awardSeasonController.update_award_season);

router.post('/config-award-categories', awardSeasonController.config_award_categories);

module.exports = router;