import express from 'express';
const router = express.Router();

import CategoriaController from '../controllers/CategoriaController.js';

router.get('/', CategoriaController.todas_categorias);
router.get('/:id', CategoriaController.unica_categoria);

router.post('/', CategoriaController.nueva_categoria);
router.put('/:id', CategoriaController.actualizar_categoria);
router.delete('/:id', CategoriaController.borrar_categoria);

export default router;
