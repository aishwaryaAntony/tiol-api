'use strict';

var _gallery = require('../controllers/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of galleries
 * Uses: To display galleries
 * URl:localhost:3000/galleries
 */
router.get('/', _gallery2.default.fetch_all_galleries);

/*
 * Method: GET
 * Parameter: id
 * Return: JSON of gallery by id
 * Uses: To display gallery by id
 * URl:localhost:3000/galleries/1
 */
router.get('/:id', _gallery2.default.fetch_gallery_by_id);

/*
  * Method: POST
  * Body Parameters : user_profile_id, name, description, status
  * Optional Body Parameters : NONE
  * Return: JSON of added gallery
  * Uses: To save gallery
  * URl:localhost:3000/galleries
  */
router.post('/', _gallery2.default.create_new_gallery);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : user_profile_id, name, description, status
 * Optional Body Parameters : NONE
 * Return: JSON of gallery by id
 * Uses: To display gallery by id
 * URl:localhost:3000/galleries/1
 */
router.put('/:id', _gallery2.default.update_gallery);

module.exports = router;