import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { signIn } = useAuth();

  if (!isOpen) return null;

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await signIn(email);
      onClose();
    } catch (error) {
      console.error('Failed to sign in:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        {/* Yellow header */}
        <div className="bg-yellow-200 px-8 pt-8 pb-6 rounded-t-lg">
          <h2 className="text-4xl font-bold text-black mb-1">
            Login
          </h2>
          <p className="text-right text-black">* Required</p>
        </div>
        
        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="modal-email" className="block text-xl font-bold text-black mb-2">
                Email *
              </label>
              <input
                id="modal-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {loading ? 'Sending...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
