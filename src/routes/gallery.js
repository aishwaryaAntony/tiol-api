var express = require('express');
var router = express.Router();
import galleryController from '../controllers/gallery';
import { upload } from "../utils/attachmentServices";

/*
  * Method: GET
  * Parameter: None
  * Return: JSON of galleries
  * Uses: To display galleries
  * URl:localhost:3000/galleries
*/
router.get('/', galleryController.fetchAllGalleries);

/*
  * Method: GET
  * Parameter: id
  * Return: JSON of gallery by id
  * Uses: To display gallery by id
  * URl:localhost:3000/galleries/1
*/
router.get('/:id', galleryController.fetchGalleryById);

/*
  * Method: POST
  * Body Parameters : user_profile_id, name, description, status
  * Optional Body Parameters : NONE
  * Return: JSON of added gallery
  * Uses: To save gallery
  * URl:localhost:3000/galleries
*/
router.post('/', galleryController.createNewGallery);

/*
  * Method: PUT
  * Parameter: id
  * Body Parameters : user_profile_id, name, description, status
  * Optional Body Parameters : NONE
  * Return: JSON of gallery by id
  * Uses: To display gallery by id
  * URl:localhost:3000/galleries/1
*/
router.put('/:id', galleryController.updateGallery);

/*
  * Method: POST
  * Body Parameters : gallery_id, is_image, video_link, status
  * Optional Body Parameters : file
  * Return: JSON of added gallery attachment
  * Uses: To save galleryattachment
  * URl:localhost:3000/galleries/gallery-attachment
*/
router.post('/gallery-attachment', upload.single("file"), galleryController.createGalleryAttachment);

/*
  * Method: DELETE
  * Parameter: id
  * Return: JSON of galleryAttachment by id
  * Uses: To delete galleryAttachment by id
  * URl:localhost:3000/galleries/gallery-attachment/1
*/
router.delete('/gallery-attachment/:id', galleryController.deleteGalleryAttachment);

module.exports = router;