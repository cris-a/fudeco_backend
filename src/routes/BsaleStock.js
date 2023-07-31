import express from 'express';
import bsaleStock from '../controllers/BsaleStockController.js';

const router = express.Router();

router.get('/stock', bsaleStock.todosStock);
router.post('/descontarstock', bsaleStock.descontarStock);
router.post('/stockUnico', bsaleStock.unStockTotal);
router.post('/stock/:id', bsaleStock.unStock);
router.post('/stockCantidad/:id', bsaleStock.cantidadStock);
router.post('/stock', bsaleStock.cargarStock);
router.post('/actualizarstock', bsaleStock.actualizarStock);

export default router;
