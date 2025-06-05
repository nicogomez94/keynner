import { v4 as uuidv4 } from 'uuid';
import { KeyTransaction, LocalData } from './interfaces';
import { KeyStatus, KeyStatusType, verifiedLocals } from '../config/config';

// Simulación de una base de datos en memoria
class Database {
  private keyTransactions: KeyTransaction[] = [];
  private verifiedLocals: LocalData[] = [...verifiedLocals];
  
  // Métodos para los locales verificados
  getLocalById(id: string): LocalData | null {
    return this.verifiedLocals.find(local => local.id === id) || null;
  }
  
  getAllLocals(): LocalData[] {
    return [...this.verifiedLocals];
  }
  
  // Métodos para las transacciones de llaves
  createKeyTransaction(ownerId: string, localId: string, collectorId: string | null = null): KeyTransaction {
    // Genera un código único de 6 caracteres alfanuméricos
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newTransaction: KeyTransaction = {
      id: uuidv4(),
      code,
      localId,
      ownerId,
      collectorId,
      status: KeyStatus.PENDING,
      createdAt: new Date(),
      receivedAt: null,
      deliveredAt: null
    };
    
    this.keyTransactions.push(newTransaction);
    return newTransaction;
  }
  
  getTransactionByCode(code: string): KeyTransaction | null {
    return this.keyTransactions.find(t => t.code === code) || null;
  }
    getTransactionsByLocalId(localId: string): KeyTransaction[] {
    return this.keyTransactions.filter(t => t.localId === localId);
  }
  
  getTransactionsByOwnerId(ownerId: string): KeyTransaction[] {
    return this.keyTransactions.filter(t => t.ownerId === ownerId);
  }
    updateTransactionStatus(code: string, status: KeyStatusType): KeyTransaction | null {
    const transaction = this.getTransactionByCode(code);
    if (!transaction) {
      return null;
    }
    
    transaction.status = status;
    
    // Actualiza las marcas de tiempo según el estado
    if (status === KeyStatus.RECEIVED && !transaction.receivedAt) {
      transaction.receivedAt = new Date();
    } else if (status === KeyStatus.DELIVERED && !transaction.deliveredAt) {
      transaction.deliveredAt = new Date();
    }
    
    return transaction;
  }
}

// Exportamos una instancia única de la base de datos
export const db = new Database();

// Añadimos algunas transacciones de ejemplo para pruebas
db.createKeyTransaction('OWNER_001', 'LOCAL_VALIDO_123', 'COLLECTOR_001');
db.createKeyTransaction('OWNER_002', 'LOCAL_VALIDO_456', 'COLLECTOR_002');
