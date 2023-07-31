import express from 'express';
import bsaleVariantes from '../controllers/Bsalevariantes.js';

const router = express.Router();

router.get('/variante', bsaleVariantes.todosVariante);
router.post('/varianteUrl', bsaleVariantes.unVariante);
router.post('/variante', bsaleVariantes.cargarVariante);
router.post('/varianteEditar', bsaleVariantes.editarVariante);

export default router;
