import express from 'express';
import bsaleTipoDocumento from '../controllers/BsaleTipoDocumentoController.js';

const router = express.Router();

router.get('/tipodocumento', bsaleTipoDocumento.todosDoc);
export default router;
