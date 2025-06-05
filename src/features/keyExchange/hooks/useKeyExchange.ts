import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.tsx';
import { confirmKeyDropOff, confirmKeyPickUp, getLocalTransactions } from '../../../services/api';
import { sendKeyStatusNotification, checkNotificationPermission } from '../../../services/notificationService';

// Tipos para las acciones de intercambio de llaves
export type KeyActionType = 'drop-off' | 'pick-up';

// Interfaz para las transacciones de llaves
export interface KeyTransaction {
  code: string;
  ownerId: string;
  localId: string;
  collectorId: string | null;
  status: string;
  createdAt: string;
  receivedAt: string | null;
  deliveredAt: string | null;
  payment?: {
    success: boolean;
    transactionId?: string;
    amount?: number;
  }
}

// Tipo para el estado del hook
interface KeyExchangeState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  transactions: KeyTransaction[];
  isLoadingTransactions: boolean;
}

// Hook personalizado para manejar la lógica de intercambio de llaves
export const useKeyExchange = () => {
  // Estado inicial
  const [state, setState] = useState<KeyExchangeState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    transactions: [],
    isLoadingTransactions: false,
  });
  
  // Obtenemos el ID del local desde el contexto de autenticación
  const auth = useAuth();

  // Verificamos permisos de notificaciones al inicializar el hook
  useEffect(() => {
    checkNotificationPermission();
    
    // Si el usuario está autenticado, cargamos las transacciones
    if (auth.isAuthenticated && auth.localId) {
      fetchTransactions();
      
      // Configurar un intervalo para actualizar las transacciones cada minuto
      const intervalId = setInterval(fetchTransactions, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [auth.isAuthenticated, auth.localId]);
  
  // Función para cargar las transacciones del local
  const fetchTransactions = async () => {
    if (!auth.localId) return;
    
    setState(prev => ({ ...prev, isLoadingTransactions: true }));
    
    try {
      const response = await getLocalTransactions(auth.localId);
      
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          transactions: response.data,
          isLoadingTransactions: false 
        }));
      }
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      setState(prev => ({ ...prev, isLoadingTransactions: false }));
    }
  };

  // Resetea los mensajes de error y éxito
  const resetMessages = () => {
    setState(prev => ({
      ...prev,
      errorMessage: null,
      successMessage: null,
    }));
  };  // Función para confirmar la recepción de una llave
  const confirmDropOff = async (code: string) => {
    try {
      resetMessages();
      setState(prev => ({ ...prev, isLoading: true }));
      
      if (!auth.localId) {
        throw new Error('No se ha identificado al local. Por favor, inicie sesión nuevamente.');
      }
      
      console.log(`Local ${auth.localId}: Procesando recepción de llave con código: ${code}`);
      
      // Llamada real a la API usando la función del servicio
      const response = await confirmKeyDropOff(code, auth.localId);
      
      if (response.success) {
        // Mostrar notificación
        if (response.data) {
          sendKeyStatusNotification(code, 'RECEIVED', auth.localId);
        }
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          successMessage: response.message,
        }));
        
        // Actualizar la lista de transacciones
        fetchTransactions();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Ha ocurrido un error al procesar la recepción',
      }));
    }
  };  // Función para confirmar la entrega de una llave
  const confirmPickUp = async (code: string) => {
    try {
      resetMessages();
      setState(prev => ({ ...prev, isLoading: true }));
      
      if (!auth.localId) {
        throw new Error('No se ha identificado al local. Por favor, inicie sesión nuevamente.');
      }
      
      console.log(`Local ${auth.localId}: Procesando entrega de llave con código: ${code}`);
      
      // Llamada real a la API usando la función del servicio
      const response = await confirmKeyPickUp(code, auth.localId);
      
      if (response.success) {
        // Mostrar notificación
        if (response.data) {
          sendKeyStatusNotification(code, 'DELIVERED', auth.localId);
          
          // Si hay información de pago, mostrarla en el mensaje de éxito
          if (response.data.payment) {
            const paymentInfo = response.data.payment;
            const successMsg = `${response.message}. ${paymentInfo.success ? 
              `Pago procesado: $${paymentInfo.amount} (ID: ${paymentInfo.transactionId})` : 
              'Hubo un problema al procesar el pago.'}`;
              
            setState(prev => ({
              ...prev,
              isLoading: false,
              successMessage: successMsg,
            }));
          } else {
            setState(prev => ({
              ...prev,
              isLoading: false,
              successMessage: response.message,
            }));
          }
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false,
            successMessage: response.message,
          }));
        }
        
        // Actualizar la lista de transacciones
        fetchTransactions();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Ha ocurrido un error al procesar la entrega',
      }));
    }
  };
  // Retorna el estado y las funciones
  return {
    ...state,
    confirmDropOff,
    confirmPickUp,
    resetMessages,
    fetchTransactions,
  };
};
