import express from 'express';
const router = express.Router();
import PedidoController from '../controllers/PedidosController.js';
import { isAdminVerifier } from '../middleware/verifyToken.js';

router.get('/', PedidoController.todas_ordenes);
router.get('/:id', PedidoController.obtener_orden);
router.post('/', PedidoController.agregar_orden);
router.put('/:id', PedidoController.actualizar_orden);
router.delete('/:id', PedidoController.borrar_pedido);

export default router;
