import { useState } from 'react';
import { useOwnerAuth } from './useOwnerAuth';
import { generateTransactionCode, getOwnerTransactions } from '../../../services/api';

// Interfaz para el estado del hook
interface CodeGeneratorState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  transactions: any[];
  isLoadingTransactions: boolean;
  generatedCode: string | null;
}

// Hook personalizado para manejar la generación de códigos de transacción
export const useCodeGenerator = () => {
  // Estado inicial
  const [state, setState] = useState<CodeGeneratorState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    transactions: [],
    isLoadingTransactions: false,
    generatedCode: null,
  });
  
  // Obtenemos el ID del propietario desde el contexto de autenticación
  const auth = useOwnerAuth();
  // Función para generar un nuevo código de transacción
  const generateCode = async (localId: string) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true,
        errorMessage: null,
        successMessage: null,
        generatedCode: null
      }));
      
      if (!auth.ownerId) {
        throw new Error('No se ha identificado como propietario. Por favor, inicie sesión nuevamente.');
      }
      
      // Llamar a la API para generar un código
      const response = await generateTransactionCode(auth.ownerId, localId);
      
      if (response.success && response.data) {
        const code = response.data.code;
        const localName = response.data.localName;
        
        // Mostrar notificación para el nuevo código
        try {
          const { sendKeyStatusNotification } = await import('../../../services/notificationService');
          sendKeyStatusNotification(code, 'PENDING', localName);
        } catch (notifError) {
          console.error('Error al mostrar notificación:', notifError);
        }
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          successMessage: `Código generado exitosamente para entregar llave en ${localName}`,
          generatedCode: code
        }));
        
        // Actualizar transacciones
        fetchTransactions();
        return true;
      } else {
        throw new Error(response.message || 'Error al generar código');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Ha ocurrido un error al generar el código',
      }));
      return false;
    }
  };
  
  // Función para cargar las transacciones del propietario
  const fetchTransactions = async () => {
    if (!auth.ownerId) return;
    
    setState(prev => ({ ...prev, isLoadingTransactions: true }));
    
    try {
      const response = await getOwnerTransactions(auth.ownerId);
      
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
  };
  
  // Limpia el código generado
  const clearGeneratedCode = () => {
    setState(prev => ({
      ...prev,
      generatedCode: null
    }));
  };
  
  // Retorna el estado y las funciones
  return {
    ...state,
    generateCode,
    fetchTransactions,
    resetMessages,
    clearGeneratedCode
  };
};
