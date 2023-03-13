import express from 'express';
import mediaController from '../controllers/mediaController.js';

const router = express.Router();

router.get('/', mediaController.index);
router.get('/:id', mediaController.unaImagen);
router.post('/', mediaController.store);
router.delete('/:id', mediaController.destroy);

export default router;
