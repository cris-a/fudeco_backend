import express from 'express';
const router = express.Router();

import {
  create_user,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from '../controllers/AuthController.js';

import { checkAuth } from '../middleware/checkAuth.js';

router.post('/registrar_usuario', create_user);
router.post('/login', autenticar);
router.get('/confirmar/:id', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil);
export default router;
