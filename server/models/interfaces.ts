import { KeyStatusType } from '../config/config';

// Interfaz para los datos del local verificado
export interface LocalData {
  id: string;
  name: string;
  address: string;
}

// Interfaz para las transacciones de llaves
export interface KeyTransaction {
  id: string;
  code: string;
  localId: string;
  ownerId: string;
  collectorId: string | null; // ID o información de la persona autorizada a retirar
  status: KeyStatusType;
  createdAt: Date;
  receivedAt: Date | null;
  deliveredAt: Date | null;
}
