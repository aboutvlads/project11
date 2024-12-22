import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import SocialButton from '../components/SocialButton';
import { supabase } from '../config/supabase';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await signIn(email);
    } catch (error) {
      console.error('Failed to sign in:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: 'https://tripwingz.com/auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      }).then(({ error, data }) => {
        if (error) throw error;
        if (data.url) window.location.href = data.url;
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <div className="flex justify-center mb-6">
          <img 
            src="/tripwingz-logo.png" 
            alt="TripWingz" 
            className="h-10 w-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6 text-[#000000]">
          Sign Up For Free
        </h1>

        <div className="space-y-4 mb-8">
          <SocialButton provider="Google" onClick={handleGoogleSignIn} />
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e5e5]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#696969]">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fdf567] text-black py-3 rounded-lg text-lg font-medium hover:bg-[#f0e955] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending magic link...' : 'Get started'}
          </button>

          <div className="relative mt-8">
            <div className="relative flex justify-center text-sm">
              <span className="text-[#696969]">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
