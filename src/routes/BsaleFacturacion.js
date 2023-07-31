import express from 'express';
import bsaleFacturacion from '../controllers/BsaleFacturacionController.js';

const router = express.Router();

router.get('/facturas', bsaleFacturacion.todosFactura);
router.get('/facturas/:id', bsaleFacturacion.unFactura);
router.post('/facturas', bsaleFacturacion.cargarFactura);

export default router;
