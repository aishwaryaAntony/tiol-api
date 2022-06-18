var express = require('express');
var router = express.Router();
import awardController from '../controllers/award';

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of awards
  * Uses: To display awards
  * URl:localhost:3000/awards
*/
router.get('/', awardController.fetchAllAwards);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of award by id
  * Uses: To display award by id
  * URl:localhost:3000/awards/1
*/
router.get('/:id', awardController.fetchAwardById);

/*
  * Method: POST
  * Body Parameters : name, description, status
  * Optional Body Parameters : description
  * Return: JSON of added award
  * Uses: To save award
  * URl:localhost:3000/awards
*/
router.post('/', awardController.createNewAward);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters : name, description, status
  * Optional Body Parameters : description
  * Return: JSON of award by id
  * Uses: To display award by id
  * URl:localhost:3000/awards/1
*/
router.put('/:id', awardController.updateAward);

module.exports = router;