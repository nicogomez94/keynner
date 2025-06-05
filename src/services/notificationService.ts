// This service handles browser notifications for key status changes
import { KeyStatus } from '../config/constants';
import type { KeyStatusType } from '../config/constants';

// Verify if notifications are supported and permission is granted
export const checkNotificationPermission = async (): Promise<boolean> => {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones de escritorio');
    return false;
  }

  // Check permission status
  if (Notification.permission === 'granted') {
    return true;
  }
  
  // Request permission if not decided yet
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Send notification based on key status
export const sendKeyStatusNotification = async (
  transactionCode: string, 
  status: string | KeyStatusType, 
  localName: string
): Promise<void> => {
  const hasPermission = await checkNotificationPermission();
  
  if (!hasPermission) {
    console.log('Permisos de notificación no concedidos');
    return;
  }

  let title = '';
  let body = '';
  
  // Normalizamos el status para manejar tanto strings como valores del enum
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case KeyStatus.RECEIVED:
      title = 'Llave Recibida';
      body = `La llave con código ${transactionCode} ha sido recibida por el local ${localName}`;
      break;
    case KeyStatus.DELIVERED:
      title = 'Llave Entregada';
      body = `La llave con código ${transactionCode} ha sido entregada por el local ${localName}`;
      break;
    case KeyStatus.PENDING:
      title = 'Nueva Transacción';
      body = `Nueva transacción de llave con código ${transactionCode} para el local ${localName}`;
      break;
    default:
      title = 'Actualización de Estado';
      body = `La llave con código ${transactionCode} ha cambiado su estado a ${status}`;
  }

  // Create and show notification
  const notification = new Notification(title, {
    body,
    icon: '/pwa-192x192.png',
  });
  
  // Close notification after 5 seconds
  setTimeout(() => notification.close(), 5000);
};
