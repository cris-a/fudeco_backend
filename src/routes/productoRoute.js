import express from 'express';
import {
  todosLosProductos,
  productoSencillo,
  productoNuevo,
  actualizarProducto,
  borrarProducto,
  todosLosProductosCompleto,
} from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', todosLosProductos);
router.get('/todos', todosLosProductosCompleto);
router.get('/:id', productoSencillo);
router.post('/:id', productoNuevo);
router.put('/:id', actualizarProducto);
router.delete('/:id', borrarProducto);

export default router;
