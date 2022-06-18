var express = require('express');
var router = express.Router();
import roleController from '../controllers/role';

/*
 * Method: GET
 * Parameter: None
 * Return: JSON of role
 * Uses: To display roles
 * URl:localhost:3000/roles
 */

router.get('/', roleController.fetch_all_roles);
/*
 * Method: GET
 * Parameter: id
 * Return: JSON of role by id
 * Uses: To display role by id
 * URl:localhost:3000/roles/1
 */

router.get('/:id', roleController.fetch_role_by_id);

/*
  * Method: POST
  * Body Parameters : code, name, status
   * Return: JSON of role
  * Uses: To save role
 URl:localhost:3000/roles
  */
router.post('/', roleController.create_new_role);

/*
 * Method: PUT
 * Parameter: id
 * Body Parameters : code, name, status 
 * Return: JSON of role by id
 * Uses: To display role by id
 * URl:localhost:3000/roles/1
 */
router.put('/:id', roleController.update_role);

module.exports = router;