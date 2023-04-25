import express from 'express';
import mediaController from '../controllers/mediaController.js';
import uploads from '../middleware/multerMedia.js';

const router = express.Router();

router.get('/', mediaController.index);
router.get('/:id', mediaController.unaImagen);
// router.post('/', mediaController.store);
// router.delete('/:id', mediaController.destroy);
router.delete('/filename/borrar/:id', mediaController.borrar);
router.post('/filename', mediaController.soloNombre);
// router.post('/filename/productos', mediaController.soloNombre);

export default router;
