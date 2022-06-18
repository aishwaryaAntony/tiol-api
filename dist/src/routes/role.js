'use strict';

var _role = require('../controllers/role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


/*
 * Method: GET
 * Parameter: None
 * Return: JSON of role
 * Uses: To display roles
 * URl:localhost:3000/roles
 */

router.get('/', _role2.default.fetch_all_roles);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of role by id
 * Uses: To display role by id
 * URl:localhost:3000/roles/1
 */

router.get('/:id', _role2.default.fetch_role_by_id);

/*
  * Method: POST
  * Body Parameters : code, name, status
   * Return: JSON of role
  * Uses: To save role
 URl:localhost:3000/roles
  */
router.post('/', _role2.default.create_new_role);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : code, name, status 
 * Return: JSON of role by id
 * Uses: To display role by id
 * URl:localhost:3000/roles/1
 */
router.put('/:id', _role2.default.update_role);

module.exports = router;