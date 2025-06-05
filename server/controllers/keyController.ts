import { Request, Response } from 'express';
import { db } from '../models/database';
import { KeyStatus } from '../config/config';

export const keyController = {
  // Crear una nueva transacción de llave
  createTransaction: (req: Request, res: Response) => {
    const { ownerId, localId, collectorId } = req.body;
    
    if (!ownerId || !localId) {
      return res.status(400).json({ success: false, message: 'Datos incompletos para crear transacción' });
    }
    
    const local = db.getLocalById(localId);
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no encontrado' });
    }
    
    const transaction = db.createKeyTransaction(ownerId, localId, collectorId);
    
    return res.status(201).json({
      success: true,
      message: 'Transacción creada exitosamente',
      data: transaction
    });
  },
  
  // Confirmar recepción de llave por un local
  confirmDropOff: (req: Request, res: Response) => {
    const { code, localId } = req.body;
    
    if (!code || !localId) {
      return res.status(400).json({ success: false, message: 'Código de transacción y ID de local requeridos' });
    }
    
    // Verificar que el local existe
    const local = db.getLocalById(localId);
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no verificado' });
    }
    
    // Buscar transacción por código
    const transaction = db.getTransactionByCode(code);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Código de transacción no encontrado' });
    }
    
    // Verificar que la transacción corresponde al local
    if (transaction.localId !== localId) {
      return res.status(403).json({ success: false, message: 'Esta transacción no está asociada a este local' });
    }
    
    // Verificar que la llave esté en estado pendiente
    if (transaction.status !== KeyStatus.PENDING) {
      return res.status(400).json({ 
        success: false, 
        message: `La llave ya ha sido ${transaction.status === KeyStatus.RECEIVED ? 'recibida' : 'entregada'}`
      });
    }
    
    // Actualizar estado
    const updatedTransaction = db.updateTransactionStatus(code, KeyStatus.RECEIVED);
    
    return res.status(200).json({
      success: true,
      message: 'Recepción de llave confirmada exitosamente',
      data: updatedTransaction
    });
  },
    // Confirmar entrega de llave a la persona autorizada
  confirmPickUp: async (req: Request, res: Response) => {
    const { code, localId } = req.body;
    
    if (!code || !localId) {
      return res.status(400).json({ success: false, message: 'Código de transacción y ID de local requeridos' });
    }
    
    // Verificar que el local existe
    const local = db.getLocalById(localId);
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no verificado' });
    }
    
    // Buscar transacción por código
    const transaction = db.getTransactionByCode(code);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Código de transacción no encontrado' });
    }
    
    // Verificar que la transacción corresponde al local
    if (transaction.localId !== localId) {
      return res.status(403).json({ success: false, message: 'Esta transacción no está asociada a este local' });
    }
    
    // Verificar que la llave esté en estado recibido
    if (transaction.status !== KeyStatus.RECEIVED) {
      if (transaction.status === KeyStatus.PENDING) {
        return res.status(400).json({ 
          success: false, 
          message: 'La llave aún no ha sido recibida por el local'
        });
      } else if (transaction.status === KeyStatus.DELIVERED) {
        return res.status(400).json({ 
          success: false, 
          message: 'La llave ya ha sido entregada'
        });
      }
    }
      // Actualizar estado
    const updatedTransaction = db.updateTransactionStatus(code, KeyStatus.DELIVERED);
    
    // Procesar el pago una vez que la llave es entregada
    try {
      const { paymentProcessor } = require('../services/paymentService');
      const paymentResult = await paymentProcessor.processPayment(updatedTransaction);
      
      // Añadir información del pago a la respuesta
      return res.status(200).json({
        success: true,
        message: 'Entrega de llave confirmada exitosamente',
        data: {
          ...updatedTransaction,
          payment: {
            success: paymentResult.success,
            message: paymentResult.message,
            transactionId: paymentResult.transactionId,
            amount: paymentResult.amount
          }
        }
      });
    } catch (error) {
      console.error('Error al procesar pago:', error);
      
      // Si hay error con el pago, igualmente confirmamos la entrega
      // pero notificamos el problema de pago
      return res.status(200).json({
        success: true,
        message: 'Entrega confirmada pero hubo un problema con el pago',
        data: updatedTransaction,
        paymentError: 'Error al procesar el pago automático'
      });
    }
  },
  
  // Obtener transacciones para un local específico
  getTransactionsByLocal: (req: Request, res: Response) => {
    const { localId } = req.params;
    
    if (!localId) {
      return res.status(400).json({ success: false, message: 'ID de local requerido' });
    }
    
    const local = db.getLocalById(localId);
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no encontrado' });
    }
    
    const transactions = db.getTransactionsByLocalId(localId);
    
    return res.status(200).json({
      success: true,
      data: transactions
    });
  },
  
  // Verificar estado de una transacción por código
  getTransactionStatus: (req: Request, res: Response) => {
    const { code } = req.params;
    
    if (!code) {
      return res.status(400).json({ success: false, message: 'Código de transacción requerido' });
    }
    
    const transaction = db.getTransactionByCode(code);
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        code: transaction.code,
        status: transaction.status,
        localId: transaction.localId,
        receivedAt: transaction.receivedAt,
        deliveredAt: transaction.deliveredAt
      }
    });
  }
};
