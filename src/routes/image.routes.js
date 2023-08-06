import express from 'express';
import {
    getImages, deleteImage, getImageById, insertImage,
} from '../controllers/image.controllers.js';
import { verifyTokenAdmin, verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get('/', getImages);
router.delete('/:id',verifyTokenAndAuthorization, deleteImage);
router.get('/:id', getImageById);
router.post('/',verifyTokenAndAuthorization, insertImage);

export default router;