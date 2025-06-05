import { OwnerDashboardScreen } from '../features/owner/screens/OwnerDashboardScreen';
import { OwnerAuthScreen } from '../features/owner/screens/OwnerAuthScreen';
import { useOwnerAuth } from '../features/owner/hooks/useOwnerAuth';

interface OwnerAppProps {
  onBackToSelector: () => void;
}

export const OwnerApp = ({ onBackToSelector }: OwnerAppProps) => {
  const { isAuthenticated, logout } = useOwnerAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>KeyNest - Propietario</h1>
        <p>Sistema de gestión de llaves para propietarios</p>
        
        {isAuthenticated ? (
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              marginTop: '10px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        ) : (
          <button 
            onClick={onBackToSelector}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              marginTop: '10px',
              cursor: 'pointer'
            }}
          >
            ← Volver
          </button>
        )}
      </header>
      
      <main>
        {isAuthenticated ? <OwnerDashboardScreen /> : <OwnerAuthScreen />}
      </main>
      
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        <p>© {new Date().getFullYear()} KeyNest - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};
