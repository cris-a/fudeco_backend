import express from 'express';
import {
  todosLosProductos,
  // productoSencillo,
  productoNuevo,
  actualizarProducto,
  borrarProducto,
  todosLosProductosCompleto,
  subcategoriaProducto,
  productoSimple,
} from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', todosLosProductos);
router.get('/simple/:id', productoSimple);
router.get('/subcate/:id', subcategoriaProducto);
router.get('/todos', todosLosProductosCompleto);
// router.get('/barraBusqueda', productoSencillo);
router.post('/:id', productoNuevo);
router.put('/:id', actualizarProducto);
router.delete('/:id', borrarProducto);

export default router;
