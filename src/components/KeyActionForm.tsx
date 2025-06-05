import { useState } from 'react';
import type { FormEvent } from 'react';
import type { KeyActionType } from '../features/keyExchange/hooks/useKeyExchange';

interface KeyActionFormProps {
  actionType: KeyActionType;
  isLoading: boolean;
  onSubmit: (code: string) => void;
  onCancel: () => void;
}

export const KeyActionForm = ({ actionType, isLoading, onSubmit, onCancel }: KeyActionFormProps) => {
  const [code, setCode] = useState('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code.trim());
    }
  };

  const actionTitle = actionType === 'drop-off' 
    ? 'Confirmar Recepción de Llave' 
    : 'Confirmar Entrega de Llave';

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h3>{actionTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="transaction-code" style={{ display: 'block', marginBottom: '5px' }}>
            Código de transacción:
          </label>
          <input
            id="transaction-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Ingrese el código de transacción"
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={isLoading || !code.trim()} 
            style={{ padding: '8px 16px' }}
          >
            {isLoading ? 'Procesando...' : 'Confirmar'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={isLoading}
            style={{ padding: '8px 16px' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
