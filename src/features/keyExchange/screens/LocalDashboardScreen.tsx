import { useState } from 'react';
import { KeyActionForm } from '../../../components/KeyActionForm';
import { useKeyExchange } from '../hooks/useKeyExchange';
import type { KeyActionType } from '../hooks/useKeyExchange';

export const LocalDashboardScreen = () => {
  const [activeAction, setActiveAction] = useState<KeyActionType | null>(null);
  const { isLoading, errorMessage, successMessage, confirmDropOff, confirmPickUp, resetMessages } = useKeyExchange();

  // Maneja el envío del formulario según el tipo de acción
  const handleSubmit = (code: string) => {
    if (activeAction === 'drop-off') {
      confirmDropOff(code);
    } else if (activeAction === 'pick-up') {
      confirmPickUp(code);
    }
  };

  // Iniciar una nueva acción
  const startAction = (action: KeyActionType) => {
    resetMessages();
    setActiveAction(action);
  };

  // Cancelar la acción actual
  const cancelAction = () => {
    resetMessages();
    setActiveAction(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Dashboard de Local Verificado</h1>
      
      {/* Mensajes de éxito y error */}
      {successMessage && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {errorMessage}
        </div>
      )}
      
      {/* Si no hay una acción activa, mostrar los botones principales */}
      {!activeAction && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={() => startAction('drop-off')} style={{ padding: '15px' }}>
            Confirmar Recepción de Llave
          </button>
          <button onClick={() => startAction('pick-up')} style={{ padding: '15px' }}>
            Confirmar Entrega de Llave
          </button>
        </div>
      )}
      
      {/* Si hay una acción activa, mostrar el formulario correspondiente */}
      {activeAction && (
        <KeyActionForm
          actionType={activeAction}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};
