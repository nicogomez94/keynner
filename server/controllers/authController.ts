import { Request, Response } from 'express';
import { db } from '../models/database';
import { verifiedLocals } from '../config/config';

export const authController = {
  // Autenticación básica para locales
  loginLocal: (req: Request, res: Response) => {
    const { localId } = req.body;
    
    if (!localId) {
      return res.status(400).json({ success: false, message: 'ID de local requerido' });
    }
    
    const local = db.getLocalById(localId);
    
    if (!local) {
      return res.status(401).json({ success: false, message: 'Local no verificado o no existe' });
    }
    
    // En un sistema real, aquí generaríamos un token JWT
    return res.status(200).json({ 
      success: true, 
      message: 'Autenticación exitosa',
      data: { 
        localId: local.id,
        name: local.name,
        // No incluimos un token JWT por simplicidad
      }
    });
  },
  
  // Verificar si un local está autorizado
  verifyLocal: (req: Request, res: Response) => {
    const { localId } = req.params;
    
    const local = db.getLocalById(localId);
    
    if (!local) {
      return res.status(404).json({ success: false, message: 'Local no encontrado' });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Local verificado',
      data: { 
        id: local.id,
        name: local.name,
        address: local.address
      }
    });
  },
  
  // Obtener todos los locales verificados
  getAllVerifiedLocals: (_req: Request, res: Response) => {
    const locals = db.getAllLocals();
    
    return res.status(200).json({
      success: true,
      data: locals
    });
  }
};
