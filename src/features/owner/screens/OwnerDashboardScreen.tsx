import { useState, useEffect } from 'react';
import { useOwnerAuth } from '../hooks/useOwnerAuth';
import { useCodeGenerator } from '../hooks/useCodeGenerator';
import { TransactionStats } from '../../../components/TransactionStats';

export const OwnerDashboardScreen = () => {
  const { ownerId } = useOwnerAuth();
  const { 
    isLoading, 
    errorMessage, 
    successMessage, 
    transactions, 
    isLoadingTransactions,
    generatedCode,
    generateCode, 
    fetchTransactions, 
    resetMessages,
    clearGeneratedCode
  } = useCodeGenerator();
  
  const [selectedLocal, setSelectedLocal] = useState('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  
  // Cargar transacciones al iniciar
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  // Manejar la generación de código
  const handleGenerateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedLocal) {
      await generateCode(selectedLocal);
    }
  };
  
  // Iniciar una nueva generación de código
  const startGeneratingCode = () => {
    resetMessages();
    setIsGeneratingCode(true);
    clearGeneratedCode();
  };
  
  // Cancelar la generación de código
  const cancelGeneratingCode = () => {
    resetMessages();
    setIsGeneratingCode(false);
    clearGeneratedCode();
    setSelectedLocal('');
  };
  
  // Locales disponibles
  const availableLocals = [
    { id: 'LOCAL_VALIDO_123', name: 'KeyNest Local Centro' },
    { id: 'LOCAL_VALIDO_456', name: 'KeyNest Local Norte' },
  ];
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Dashboard de Propietario</h1>
      
      {/* Información del propietario */}
      <p style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e6f7ff', borderRadius: '4px' }}>
        Propietario: <strong>{ownerId}</strong>
      </p>
      
      {/* Mensajes de éxito y error */}
      {successMessage && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>
          {successMessage}          {generatedCode && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '26px',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}>
                {generatedCode}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  alert('Código copiado al portapapeles');
                }}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '8px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Copiar Código
              </button>
            </div>
          )}
        </div>
      )}
      
      {errorMessage && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {errorMessage}
        </div>
      )}
      
      {/* Si no está generando un código, mostrar botón principal */}
      {!isGeneratingCode && (
        <div style={{ marginBottom: '30px' }}>
          <button 
            onClick={startGeneratingCode} 
            style={{ 
              padding: '15px 20px',
              fontSize: '1.1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Generar Nuevo Código de Transacción
          </button>
        </div>
      )}
      
      {/* Formulario para generar código */}
      {isGeneratingCode && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '30px' }}>
          <h3>Generar Código para Entrega de Llave</h3>
          <form onSubmit={handleGenerateCode}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="local-select" style={{ display: 'block', marginBottom: '5px' }}>
                Seleccione el local para depositar la llave:
              </label>
              <select
                id="local-select"
                value={selectedLocal}
                onChange={(e) => setSelectedLocal(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                disabled={isLoading}
                required
              >
                <option value="">-- Seleccione un local --</option>
                {availableLocals.map(local => (
                  <option key={local.id} value={local.id}>{local.name}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                disabled={isLoading || !selectedLocal} 
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                {isLoading ? 'Generando...' : 'Generar Código'}
              </button>
              <button 
                type="button" 
                onClick={cancelGeneratingCode} 
                disabled={isLoading}
                style={{ padding: '8px 16px' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Lista de transacciones */}
      <div>
        <h2>Mis Transacciones</h2>
        
        {/* Estadísticas de transacciones */}
        {!isLoadingTransactions && transactions.length > 0 && (
          <TransactionStats 
            transactions={transactions} 
            title="Resumen de transacciones"
          />
        )}
        
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={fetchTransactions} 
            disabled={isLoadingTransactions}
            style={{ 
              padding: '5px 10px',
              marginBottom: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #ccc'
            }}
          >
            {isLoadingTransactions ? 'Actualizando...' : '↻ Actualizar'}
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
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Local</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Estado</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any) => (
                  <tr key={tx.code}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.code}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.localName}</td>
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
                      {new Date(tx.createdAt).toLocaleString()}
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
    </div>
  );
};
