'use strict';

var _selectedNominee = require('../controllers/selectedNominee');

var _selectedNominee2 = _interopRequireDefault(_selectedNominee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

/*
    * Method: GET
    * Parameter: id
    * Return: JSON of selected-nominee by id
    * Uses: To display selected-nominee by id
    * URl:localhost:3000/selected-nominees/1
*/

router.get('/:id', _selectedNominee2.default.fetch_selected_nominee_by_id);

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of selected_nominee
 * Uses: To display selected_nominee
 * URl:localhost:3000/selected-nominees
 */
router.get('/', _selectedNominee2.default.fetch_all_selected_nominees);

module.exports = router;