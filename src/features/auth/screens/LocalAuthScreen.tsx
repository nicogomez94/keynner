import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export const LocalAuthScreen = () => {
  const [localId, setLocalId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!localId.trim()) {
      setError('Por favor, ingrese el ID del local');
      return;
    }

    const success = login(localId.trim());
    
    if (!success) {
      setError('ID de local no válido. Intente nuevamente.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>KeyNest - Acceso de Local</h1>
      
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {error}
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
            required
          />
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            <em>Pista: Utilice "LOCAL_VALIDO_123" para iniciar sesión</em>
          </p>
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
