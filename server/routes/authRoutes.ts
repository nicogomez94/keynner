import express, { Router } from 'express';
import { authController } from '../controllers/authController';

const router: Router = express.Router();

// Rutas de autenticación
router.post('/login', function(req, res) {
    authController.loginLocal(req, res);
});
router.get('/verify/:localId', function(req, res) {
    authController.verifyLocal(req, res);
});
router.get('/all', function(req, res) {
    authController.getAllVerifiedLocals(req, res);
});

export default router;
