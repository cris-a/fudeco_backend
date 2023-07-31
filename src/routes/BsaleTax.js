import express from 'express';
import bsaleTaxes from '../controllers/BsaleTaxesController.js';

const router = express.Router();

router.get('/taxes', bsaleTaxes.todosTaxes);

export default router;
