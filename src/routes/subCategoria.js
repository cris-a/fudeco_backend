import express from 'express';
import {
  actualizarSubCategoria,
  borrarSubcategoria,
  mostrarSubCategorias,
  nuevaSubCategoria,
} from '../controllers/SubCategoriaController.js';
const router = express.Router();

router.post('/agregar', nuevaSubCategoria);
router.get('/:id', mostrarSubCategorias);
router.delete('/borrar/:id', borrarSubcategoria);
router.put('/modificar/:id', actualizarSubCategoria);

export default router;
