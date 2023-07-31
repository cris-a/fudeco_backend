import express from 'express';
import bsaleProductos from '../controllers/BsaleProductosController.js';
const router = express.Router();

router.post('/producto', bsaleProductos.cargarProducto);
router.post('/productoQuery', bsaleProductos.todosProductoQuery);
router.get('/producto', bsaleProductos.todosProducto);
router.post('/productoUnico', bsaleProductos.unProducto);
router.post('/buscarProducto', bsaleProductos.buscadorProducto);
router.post('/editarProducto', bsaleProductos.editarProducto);
router.post('/productoPorNombre/:id', bsaleProductos.buscadorProductoxNombre);

export default router;
