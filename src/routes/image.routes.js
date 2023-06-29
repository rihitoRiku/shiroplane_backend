import express from 'express';
import {
    getImages, deleteImage, getImageById,
} from '../controllers/image.controllers.js';

const router = express.Router();
router.get('/images', getImages);
router.delete('/:id', deleteImage);
router.get('/:id', getImageById);

export default router;