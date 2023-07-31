import express from 'express';
import bsaleSucursal from '../controllers/BsaleSucursales.js';
const router = express.Router();

router.get('/sucursal', bsaleSucursal.todosSucursal);
export default router;
