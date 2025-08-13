import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext.tsx';

// Custom render function that includes providers
export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
