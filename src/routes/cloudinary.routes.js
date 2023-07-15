import express from 'express';
import {
    getImages, deleteImage, insertImage,
} from '../controllers/cloudinary.controllers.js';

const router = express.Router();
router.get('/', getImages);
router.post('/:id', deleteImage);
// router.get('/:id', getImageById);
router.post('/', insertImage);

export default router;