'use strict';

var _awardSeason = require('../controllers/awardSeason');

var _awardSeason2 = _interopRequireDefault(_awardSeason);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of  awardSeason
 * Uses: To display awardSeasons
 * URl:localhost:3000/award-seasons
 */
router.get('/', _awardSeason2.default.fetch_all_award_seasons);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of awardSeason by id
 * Uses: To display awardSeason by id
 * URl:localhost:3000/award-seasons/1
 */
router.get('/:id', _awardSeason2.default.fetch_award_season_by_id);

/*
  * Method: POST
  * Body Parameters: event_name, description, nomination_start_date, nomination_end_date, voting_start_date, voting_end_date, event_date, status
  * Return: JSON of awardSeason
  * Uses: To save awardSeason
  * URl:localhost:3000/award-seasons
  */
router.post('/', _awardSeason2.default.create_new_award_season);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters: event_name, description, nomination_start_date, nomination_end_date, voting_start_date, voting_end_date, event_date, status
 * Return: JSON of awardSeason by id
 * Uses: To display awardSeason by id
 * URl:localhost:3000/award-seasons/1
 */
router.put('/:id', _awardSeason2.default.update_award_season);

router.post('/config-award-categories', _awardSeason2.default.config_award_categories);

module.exports = router;