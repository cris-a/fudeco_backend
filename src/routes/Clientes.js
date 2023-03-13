import express from 'express';
import {
  borrarCliente,
  clienteNuevo,
  editarCliente,
  todosLosClientes,
  confirmar,
  olvidePassword,
  comprobarToken,
  autenticar,
  nuevoPassword,
  perfil,
  clienteSencillo,
} from '../controllers/ClienteController.js';

import { checkAuthCliente } from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', todosLosClientes);
router.get('/buscar-cliente/:id', clienteSencillo);
router.get('/confirmar/:id', confirmar);
router.post('/registrar_cliente', clienteNuevo);
router.put('/:id', editarCliente);
router.delete('/:id', borrarCliente);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.post('/login', autenticar);
router.get('/perfil', checkAuthCliente, perfil);

export default router;
