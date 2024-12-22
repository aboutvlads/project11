import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function NavBar() {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">tripwingz.</div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{currentUser.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
