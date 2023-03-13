import express from 'express';
const router = express.Router();

import CarritoController from '../controllers/CarritoController.js';

router.get('/', CarritoController.todos_carritos);
router.get('/buscar/:id', CarritoController.unico_carrito);
router.post('/crear', CarritoController.crear_carrito);
router.put('/:id', CarritoController.actualizar_carrito);
router.delete('/:id', CarritoController.borrar_carrito);

export default router;
