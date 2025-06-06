import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';

export const LocalAuthScreen = () => {
  const [localId, setLocalId] = useState('');
  const { login, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!localId.trim()) {
      return;
    }

    await login(localId.trim());
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>KeyNest - Acceso de Local</h1>
      
      {authError && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {authError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="local-id" style={{ display: 'block', marginBottom: '5px' }}>
            ID del Local:
          </label>
          <input
            id="local-id"
            type="text"
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Ingrese el ID del local"
            disabled={isLoading}
            required
          />
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            <em>Prueba con: "LOCAL_VALIDO_123" o "LOCAL_VALIDO_456"</em>
          </p>
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#333', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'wait' : 'pointer'
          }}
        >
          {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};
