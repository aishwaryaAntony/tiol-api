var express = require('express');
var router = express.Router();
import voterController from '../controllers/voter';

router.get('/', voterController.fetch_all_voters);

router.get('/:id', voterController.fetch_vote_by_id);

router.post('/', voterController.create_new_vote);

module.exports = router;
