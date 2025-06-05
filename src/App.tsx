import { LocalDashboardScreen } from './features/keyExchange/screens/LocalDashboardScreen';
import { LocalAuthScreen } from './features/auth/screens/LocalAuthScreen';
import { AuthProvider, useAuth } from './features/auth/hooks/useAuth.tsx';

// Componente principal que decide qué pantalla mostrar según el estado de autenticación
const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>KeyNest</h1>
        <p>Sistema de intercambio de llaves para locales verificados</p>
        {isAuthenticated && (
          <button 
            onClick={logout}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              marginTop: '10px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
