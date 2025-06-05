import { LocalDashboardScreen } from './features/keyExchange/screens/LocalDashboardScreen'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>KeyNest</h1>
        <p>Sistema de intercambio de llaves para locales verificados</p>
      </header>
      <main>
        <LocalDashboardScreen />
      </main>
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        <p>© {new Date().getFullYear()} KeyNest - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
