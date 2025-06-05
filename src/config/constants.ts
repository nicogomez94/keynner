// Constantes compartidas entre cliente y servidor
// Estas constantes deben estar sincronizadas con las del servidor

// Estado de las llaves
export const KeyStatus = {
  PENDING: 'pending',      // Pendiente: el código está generado pero la llave aún no se entregó al local
  RECEIVED: 'received',    // Recibida: el local confirmó la recepción de la llave
  DELIVERED: 'delivered',  // Entregada: el local entregó la llave a la persona autorizada
} as const;

export type KeyStatusType = typeof KeyStatus[keyof typeof KeyStatus];
