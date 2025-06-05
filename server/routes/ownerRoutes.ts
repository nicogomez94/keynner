import express, { Router } from 'express';
import { ownerController } from '../controllers/ownerController';

const router: Router = express.Router();

// Autenticar propietario
router.post('/login', function(req, res) {
    ownerController.login(req, res);
});

// Generar código de transacción
router.post('/generate-code', function(req, res) {
    ownerController.generateTransactionCode(req, res);
});

// Obtener transacciones de un propietario
router.get('/:ownerId/transactions', function(req, res) {
    ownerController.getTransactionsByOwner(req, res);
});

// Export the router
export default router;
