import { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.tsx';

// Tipos para las acciones de intercambio de llaves
export type KeyActionType = 'drop-off' | 'pick-up';

// Tipo para el estado del hook
interface KeyExchangeState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

// Hook personalizado para manejar la lógica de intercambio de llaves
export const useKeyExchange = () => {
  // Estado inicial
  const [state, setState] = useState<KeyExchangeState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
  });
  
  // Obtenemos el ID del local desde el contexto de autenticación
  const auth = useAuth();

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
      
      // Simulación de una llamada a API usando fetch
      const response = await simulateApiCall('/api/local/key-dropoff', {
        localId: auth.localId,
        transactionCode: code
      });
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          successMessage: response.message,
        }));
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
      
      // Simulación de una llamada a API usando fetch
      const response = await simulateApiCall('/api/local/key-pickup', {
        localId: auth.localId,
        transactionCode: code
      });
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          successMessage: response.message,
        }));
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
  // Función para simular una llamada a API
  const simulateApiCall = async (url: string, data: { localId: string; transactionCode: string }): Promise<{ success: boolean; message: string }> => {
    // Simulación de una latencia de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Obtener la acción del tipo de URL para generar un mensaje adecuado
    const actionType = url.includes('dropoff') ? 'recepción' : 'entrega';
    
    // Validación del código
    if (!data.transactionCode || data.transactionCode.trim().length < 4) {
      return {
        success: false,
        message: `El código de transacción debe tener al menos 4 caracteres`
      };
    }
    
    // Código específico para simular un error
    if (data.transactionCode === 'TEST_ERROR_CODE') {
      return {
        success: false,
        message: `Error: Código de transacción inválido o ya utilizado`
      };
    }
    
    // Si todo está bien, retornar éxito
    return {
      success: true,
      message: `La ${actionType} de llave con código ${data.transactionCode} ha sido confirmada correctamente`
    };
  };

  // Retorna el estado y las funciones
  return {
    ...state,
    confirmDropOff,
    confirmPickUp,
    resetMessages,
  };
};
