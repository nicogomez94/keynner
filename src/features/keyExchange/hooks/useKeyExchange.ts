import { useState } from 'react';

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

  // Resetea los mensajes de error y éxito
  const resetMessages = () => {
    setState(prev => ({
      ...prev,
      errorMessage: null,
      successMessage: null,
    }));
  };

  // Función para confirmar la recepción de una llave
  const confirmDropOff = async (code: string) => {
    try {
      resetMessages();
      setState(prev => ({ ...prev, isLoading: true }));
      
      console.log(`Procesando recepción de llave con código: ${code}`);
      
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Validación simple: el código debe tener al menos 4 caracteres
      if (code.length < 4) {
        throw new Error('El código debe tener al menos 4 caracteres');
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        successMessage: `Recepción de llave con código ${code} confirmada correctamente`,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Ha ocurrido un error al procesar la recepción',
      }));
    }
  };

  // Función para confirmar la entrega de una llave
  const confirmPickUp = async (code: string) => {
    try {
      resetMessages();
      setState(prev => ({ ...prev, isLoading: true }));
      
      console.log(`Procesando entrega de llave con código: ${code}`);
      
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Validación simple: el código debe tener al menos 4 caracteres
      if (code.length < 4) {
        throw new Error('El código debe tener al menos 4 caracteres');
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        successMessage: `Entrega de llave con código ${code} confirmada correctamente`,
      }));
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
  };
};
