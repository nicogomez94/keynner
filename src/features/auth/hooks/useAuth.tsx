import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { loginLocal } from '../../../services/api';

interface AuthContextType {
  localId: string | null;
  isAuthenticated: boolean;
  login: (id: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Creamos el contexto con un valor inicial
const AuthContext = createContext<AuthContextType>({
  localId: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

// Proveedor del contexto de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [localId, setLocalId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para iniciar sesión
  const login = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginLocal(id);
      
      if (response.success) {
        setLocalId(id);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(response.message || 'Error de autenticación');
        return false;
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setLocalId(null);
    setIsAuthenticated(false);
    setError(null);
  };
  return (
    <AuthContext.Provider value={{ 
      localId, 
      isAuthenticated, 
      login, 
      logout,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
