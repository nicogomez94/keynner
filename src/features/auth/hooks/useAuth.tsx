import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  localId: string | null;
  isAuthenticated: boolean;
  login: (id: string) => boolean;
  logout: () => void;
}

// Creamos el contexto con un valor inicial
const AuthContext = createContext<AuthContextType>({
  localId: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// ID de local válido hardcodeado
const VALID_LOCAL_ID = 'LOCAL_VALIDO_123';

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [localId, setLocalId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para iniciar sesión
  const login = (id: string): boolean => {
    if (id === VALID_LOCAL_ID) {
      setLocalId(id);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Función para cerrar sesión
  const logout = () => {
    setLocalId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ localId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
