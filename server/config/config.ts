// Configuraciones y variables de entorno
export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'keynest-secret-key',
};

// Lista de locales verificados (en producción, esto vendría de una base de datos)
export const verifiedLocals = [
  { id: 'LOCAL_VALIDO_123', name: 'KeyNest Local Centro', address: 'Av. Principal 123' },
  { id: 'LOCAL_VALIDO_456', name: 'KeyNest Local Norte', address: 'Calle Secundaria 456' },
];

// Estado de las llaves
export const KeyStatus = {
  PENDING: 'pending',      // Pendiente: el código está generado pero la llave aún no se entregó al local
  RECEIVED: 'received',    // Recibida: el local confirmó la recepción de la llave
  DELIVERED: 'delivered',  // Entregada: el local entregó la llave a la persona autorizada
} as const;

export type KeyStatusType = typeof KeyStatus[keyof typeof KeyStatus];
