import { useState } from 'react';
import { LocalApp } from './LocalApp';
import { OwnerApp } from './OwnerApp';

// Tipos de usuario
type UserType = 'local' | 'owner' | null;

export const AppSwitcher = () => {
  const [userType, setUserType] = useState<UserType>(null);
  
  // Si aún no se ha seleccionado el tipo de usuario
  if (userType === null) {
    return (
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h1>KeyNest</h1>
        <p style={{ marginBottom: '30px' }}>Sistema de intercambio de llaves</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={() => setUserType('local')}
            style={{ 
              padding: '20px', 
              fontSize: '1.2rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Acceder como Local Verificado
          </button>
          
          <button
            onClick={() => setUserType('owner')}
            style={{ 
              padding: '20px', 
              fontSize: '1.2rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Acceder como Propietario
          </button>
        </div>
        
        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>
          <p>Seleccione el tipo de usuario para continuar</p>
        </div>      </div>
    );
  }  // Renderizar la aplicación correspondiente según el tipo de usuario
  if (userType === 'local') {
    return <LocalApp onBackToSelector={() => setUserType(null)} />;
  }
  
  if (userType === 'owner') {
    return <OwnerApp onBackToSelector={() => setUserType(null)} />;
  }
  
  return null; // Nunca debería llegar aquí porque ya manejamos el caso userType === null
};
