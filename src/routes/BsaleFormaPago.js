import express from 'express';
import bsaleFormaPago from '../controllers/BsalePaymentTypeController.js';
const router = express.Router();

router.get('/formaPago', bsaleFormaPago.todosFormaPago);

export default router;
