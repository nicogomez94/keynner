import { LocalDashboardScreen } from '../features/keyExchange/screens/LocalDashboardScreen';
import { LocalAuthScreen } from '../features/auth/screens/LocalAuthScreen';
import { useAuth } from '../features/auth/hooks/useAuth';

interface LocalAppProps {
  onBackToSelector: () => void;
}

export const LocalApp = ({ onBackToSelector }: LocalAppProps) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>KeyNest - Local Verificado</h1>
        <p>Sistema de intercambio de llaves para locales verificados</p>
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
        {isAuthenticated ? <LocalDashboardScreen /> : <LocalAuthScreen />}
      </main>
      
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        <p>© {new Date().getFullYear()} KeyNest - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};
