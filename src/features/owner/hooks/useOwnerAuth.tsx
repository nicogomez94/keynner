import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { loginOwner } from '../../../services/api';

interface OwnerAuthContextType {
  ownerId: string | null;
  isAuthenticated: boolean;
  login: (id: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Creamos el contexto con un valor inicial
const OwnerAuthContext = createContext<OwnerAuthContextType>({
  ownerId: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

// Proveedor del contexto de autenticación para propietarios
export const OwnerAuthProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para iniciar sesión como propietario
  const login = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginOwner(id);
      
      if (response.success) {
        setOwnerId(id);
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
    setOwnerId(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <OwnerAuthContext.Provider value={{ 
      ownerId, 
      isAuthenticated, 
      login, 
      logout,
      isLoading,
      error
    }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación de propietarios
export const useOwnerAuth = () => {
  return useContext(OwnerAuthContext);
};
