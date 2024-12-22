import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  showToast: (message: string, type: 'success' | 'error') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setCurrentUser(session?.user ?? null);
      
      // If we're on the callback URL (contains #), redirect to /deals
      if (window.location.hash && session?.user) {
        window.location.href = '/deals';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/deals`,
        },
      });
      
      if (error) throw error;
      showToast('Check your email for the magic link!', 'success');
    } catch (error) {
      console.error('Error signing in:', error);
      showToast('Failed to send magic link', 'error');
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showToast('Signed out successfully', 'success');
    } catch (error) {
      console.error('Error signing out:', error);
      showToast('Failed to sign out', 'error');
      throw error;
    }
  }

  function showToast(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
    showToast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
