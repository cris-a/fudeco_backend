import express from 'express';
const router = express.Router();

import {
  borrarEmail,
  editarEmail,
  emailNuevo,
  emailUnico,
  todosLosemail,
} from '../controllers/NewsletterController.js';

router.post('/', emailNuevo);
router.get('/', todosLosemail);
router.get('/:id', emailUnico);
router.put('/:id', editarEmail);
router.delete('/:id', borrarEmail);

export default router;
