import React from 'react';
import type { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

// Componente simplificado que solo pasa los hijos
export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

