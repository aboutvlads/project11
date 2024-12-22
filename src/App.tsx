import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DealsPage } from './pages/DealsPage';
import { DealPage } from './pages/DealPage';
import { SignInPage } from './pages/SignInPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { LoginModal } from './components/LoginModal';
import { Toaster } from 'react-hot-toast';
import { AuthCallbackPage } from './pages/AuthCallbackPage';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Listen for the custom event from the landing page
    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    window.addEventListener('openLoginModal', handleOpenLoginModal);

    // Add error boundary
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught:', event.error);
      setError(event.error);
    };
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
        <Routes>
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/deals"
            element={
              <ProtectedRoute>
                <DealsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deals/:id"
            element={
              <ProtectedRoute>
                <DealPage />
              </ProtectedRoute>
            }
          />
          {/* Root path left empty for future landing page */}
          <Route path="/" element={<div />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}