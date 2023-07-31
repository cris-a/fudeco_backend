import express from 'express';
import bsale from '../controllers/BsaleController.js';
const router = express.Router();

router.post('/categoria', bsale.cargarCategoria);
router.get('/producto', bsale.todosCategoria);
router.get('/producto/:id', bsale.unCategoria);
router.put('/producto/:id', bsale.editarCategoria);

export default router;
