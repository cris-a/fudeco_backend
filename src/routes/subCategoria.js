import express from 'express';
import {
  actualizarSubCategoria,
  borrarSubcategoria,
  mostrarSubCategorias,
  nuevaSubCategoria,
  unasubCategoria,
} from '../controllers/SubCategoriaController.js';
const router = express.Router();

router.post('/agregar', nuevaSubCategoria);
router.get('/:id', mostrarSubCategorias);
router.get('/subcate/:id', unasubCategoria);
router.delete('/borrar/:id', borrarSubcategoria);
router.put('/modificar/:id', actualizarSubCategoria);

export default router;
