// routes/perfilRoutes.js
import express from 'express';
import perfilController from '../controllers/perfilController.js';

const router = express.Router();

// Rota para carregar os dados do perfil
router.get('/dados', perfilController.carregarPerfil);

export default router;
