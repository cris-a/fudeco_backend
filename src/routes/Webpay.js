import express from 'express';
import webpay from '../controllers/WebpayController.js';

const router = express.Router();

router.post('/pagar', webpay.webpay_pagar);
router.get('/respuesta', webpay.webpay_respuesta);
router.put('/actualizar/:id', webpay.actualizarWebpay);
router.get('/buscar/:id', webpay.valorWebpay);

export default router;
