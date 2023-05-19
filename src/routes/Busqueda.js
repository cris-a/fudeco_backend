import express from 'express';
import { productoSencillo } from '../controllers/BusquedaController.js';

const router = express.Router();

router.get('/barraBusqueda', productoSencillo);

export default router;
