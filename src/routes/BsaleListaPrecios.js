import express from 'express';
import bsaleLista from '../controllers/BsaleListaPreciosController.js';

const router = express.Router();

router.get('/listaprecios', bsaleLista.todosLista);

export default router;
