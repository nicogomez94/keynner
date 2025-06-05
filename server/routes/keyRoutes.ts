import express, { Router } from 'express';
import { keyController } from '../controllers/keyController';

const router: Router = express.Router();

// Rutas para gestión de llaves/transacciones
router.post('/transaction', function(req, res) {
    keyController.createTransaction(req, res);
});
router.post('/drop-off', function(req, res) {
    keyController.confirmDropOff(req, res);
});
router.post('/pick-up', function(req, res) {
    keyController.confirmPickUp(req, res);
});
router.get('/local/:localId', function(req, res) {
    keyController.getTransactionsByLocal(req, res);
});
router.get('/status/:code', function(req, res) {
    keyController.getTransactionStatus(req, res);
});

export default router;
