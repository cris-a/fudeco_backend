import express from 'express';
const router = express.Router();

import {
  accessLevelVerifier,
  isAdminVerifier,
} from '../middleware/verifyToken.js';

import UserController from '../controllers/UsuarioController.js';

router.get('/', isAdminVerifier, UserController.usuarios_todos);
router.get('/:id', UserController.usuario_unico);
router.get('/:stats', isAdminVerifier, UserController.datos_usuario);
router.put('/:id', accessLevelVerifier, UserController.actualizar_usuario);
router.delete('/:id', isAdminVerifier, UserController.borrar_usuario);

export default router;
