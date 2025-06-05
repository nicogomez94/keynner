import { useState, useEffect } from 'react';
import { KeyActionForm } from '../../../components/KeyActionForm';
import { useKeyExchange } from '../hooks/useKeyExchange';
import type { KeyActionType } from '../hooks/useKeyExchange';
import { useAuth } from '../../auth/hooks/useAuth.tsx';
import { TransactionStats } from '../../../components/TransactionStats';

export const LocalDashboardScreen = () => {
  const [activeAction, setActiveAction] = useState<KeyActionType | null>(null);
  const { isLoading, errorMessage, successMessage, transactions, isLoadingTransactions, confirmDropOff, confirmPickUp, resetMessages, fetchTransactions } = useKeyExchange();
  const { localId } = useAuth();
    // Efecto para cargar las transacciones al inicio
  useEffect(() => {
    if (localId) {
      fetchTransactions();
    }
  }, [localId, fetchTransactions]);
  
  // Efecto para limpiar el formulario después de una operación exitosa
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        resetMessages();
        setActiveAction(null);
      }, 4000); // Limpiar después de 4 segundos
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, resetMessages]);

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
  };  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Dashboard de Local Verificado</h1>
      
      {/* Información del local */}
      <p style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e6f7ff', borderRadius: '4px' }}>
        Local verificado: <strong>{localId}</strong>
      </p>
      
      {/* Mensajes de éxito y error */}
      {successMessage && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>
          {successMessage}
          <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
            <em>Este mensaje se cerrará automáticamente en unos segundos...</em>
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {errorMessage}
        </div>
      )}
      
      {/* Si no hay una acción activa, mostrar los botones principales */}
      {!activeAction && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          <button 
            onClick={() => startAction('drop-off')} 
            style={{ 
              padding: '15px', 
              backgroundColor: '#28a745', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem'
            }}
          >
            Confirmar Recepción de Llave
          </button>
          <button 
            onClick={() => startAction('pick-up')} 
            style={{ 
              padding: '15px',
              backgroundColor: '#007bff', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem'
            }}
          >
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
      
      {/* Lista de transacciones */}
      {!activeAction && (
        <div style={{ marginTop: '30px' }}>
          <h2>Mis Transacciones</h2>
          
          {/* Estadísticas de transacciones */}
          {!isLoadingTransactions && transactions.length > 0 && (
            <TransactionStats 
              transactions={transactions} 
              title="Resumen de llaves" 
            />
          )}
          
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={fetchTransactions}
              style={{ 
                padding: '5px 10px',
                marginBottom: '10px',
                backgroundColor: 'transparent',
                border: '1px solid #ccc'
              }}
            >
              ↻ Actualizar
            </button>
          </div>
            {isLoadingTransactions ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Cargando transacciones...</div>
          ) : transactions.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Código</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Estado</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Recibida</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Entregada</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx: any) => (
                    <tr key={tx.code}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.code}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <span style={{ 
                          padding: '3px 6px', 
                          borderRadius: '3px',
                          backgroundColor: 
                            tx.status === 'received' ? '#e6f7ff' :
                            tx.status === 'delivered' ? '#d4edda' : '#fff3cd',
                          fontSize: '0.9rem'
                        }}>
                          {tx.status === 'pending' ? 'Pendiente' : 
                          tx.status === 'received' ? 'Recibida' : 'Entregada'}
                        </span>
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {tx.receivedAt ? new Date(tx.receivedAt).toLocaleString() : '-'}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {tx.deliveredAt ? new Date(tx.deliveredAt).toLocaleString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'center' }}>
              No hay transacciones disponibles
            </div>
          )}
        </div>
      )}
    </div>
  );
};
