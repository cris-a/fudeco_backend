import express from 'express';
import bsaleClientes from '../controllers/BsaleClientesController.js';

const router = express.Router();

router.get('/clientesBsale', bsaleClientes.todosCliente);
export default router;
