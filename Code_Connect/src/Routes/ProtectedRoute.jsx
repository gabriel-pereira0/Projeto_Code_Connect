import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Spinner } from '../components/Spinner';

import { useNavigate } from 'react-router';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // Redirecionar para a página de login
      navigate('/auth/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
