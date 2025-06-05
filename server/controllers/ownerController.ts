import { Request, Response } from 'express';
import { db } from '../models/database';
import { KeyStatus } from '../config/config';

export const ownerController = {
  // Autenticar un propietario
  login: (req: Request, res: Response) => {
    const { ownerId } = req.body;
    
    if (!ownerId) {
      return res.status(400).json({ success: false, message: 'ID de propietario requerido' });
    }
    
    // En una app real, verificaríamos credenciales en la base de datos
    // Aquí simulamos una autenticación simple por ID
    
    return res.status(200).json({
      success: true,
      message: 'Propietario autenticado correctamente',
      data: { ownerId }
    });
  },
  
  // Generar un nuevo código de transacción
  generateTransactionCode: (req: Request, res: Response) => {
    const { ownerId, localId } = req.body;
    
    if (!ownerId || !localId) {
      return res.status(400).json({ success: false, message: 'ID de propietario y local requeridos' });
    }
    
    // Verificar que el local existe
    const local = db.getLocalById(localId);
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no encontrado' });
    }
    
    // Crear una nueva transacción para generar un código
    const transaction = db.createKeyTransaction(ownerId, localId);
    
    return res.status(201).json({
      success: true,
      message: 'Código de transacción generado exitosamente',
      data: {
        code: transaction.code,
        localId: transaction.localId,
        localName: local.name,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });
  },
  
  // Obtener todas las transacciones de un propietario
  getTransactionsByOwner: (req: Request, res: Response) => {
    const { ownerId } = req.params;
    
    if (!ownerId) {
      return res.status(400).json({ success: false, message: 'ID de propietario requerido' });
    }
    
    // Obtener transacciones del propietario
    const transactions = db.getTransactionsByOwnerId(ownerId);
    
    // Añadir nombres de locales a las transacciones
    const enhancedTransactions = transactions.map(t => {
      const local = db.getLocalById(t.localId);
      return {
        ...t,
        localName: local?.name || 'Local desconocido'
      };
    });
    
    return res.status(200).json({
      success: true,
      data: enhancedTransactions
    });
  }
};
