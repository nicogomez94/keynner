import React from 'react';
import { OwnerApp } from './OwnerApp';

interface OwnerContainerProps {
  onBackToSelector: () => void;
}

// Este componente simplemente envuelve OwnerApp
export const OwnerContainer: React.FC<OwnerContainerProps> = ({ onBackToSelector }) => {
  return <OwnerApp onBackToSelector={onBackToSelector} />;
};
