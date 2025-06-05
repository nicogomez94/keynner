import React from 'react';
import { LocalApp } from './LocalApp';

interface AuthContainerProps {
  onBackToSelector: () => void;
}

// Este componente simplemente envuelve LocalApp y proporciona el contexto de autenticación
export const AuthContainer: React.FC<AuthContainerProps> = ({ onBackToSelector }) => {
  return <LocalApp onBackToSelector={onBackToSelector} />;
};
