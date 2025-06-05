import { useState } from 'react';
import type { FormEvent } from 'react';
import { useOwnerAuth } from '../hooks/useOwnerAuth';

export const OwnerAuthScreen = () => {
  const [ownerId, setOwnerId] = useState('');
  const { login, isLoading, error } = useOwnerAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ownerId.trim()) {
      return;
    }

    await login(ownerId.trim());
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>KeyNest - Acceso de Propietario</h1>
      
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="owner-id" style={{ display: 'block', marginBottom: '5px' }}>
            ID del Propietario:
          </label>
          <input
            id="owner-id"
            type="text"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Ingrese su ID de propietario"
            disabled={isLoading}
            required
          />
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            <em>Prueba con: "OWNER_001" o "OWNER_002"</em>
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
