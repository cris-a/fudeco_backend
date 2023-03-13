import express from 'express';
const router = express.Router();

import OrdenController from '../controllers/OrdenController.js';

import {
  authenticationVerifier,
  accessLevelVerifier,
  isAdminVerifier,
} from '../middleware/verifyToken.js';

router.get('/', OrdenController.todas_ordenes);
router.get('/income', isAdminVerifier, OrdenController.obtener_ingresos);
router.get('/:id', OrdenController.obtener_orden);
router.post('/', OrdenController.agregar_orden);
router.put('/:id', OrdenController.actualizar_orden);
router.delete('/:id', isAdminVerifier, OrdenController.borrar_orden);
router.get(
  '/portal/:token',
  authenticationVerifier,
  OrdenController.pagoEstatus
);

export default router;
