import express from 'express';
const router = express.Router();
import { buscar } from '../controllers/CloudinaryController.js';

router.get('/', buscar);

export default router;
