import React, { useState } from 'react';
import { LogOutIcon, LoaderIcon } from 'lucide-react';
import { getFirebaseAuth } from '../lib/firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

interface AuthButtonProps {
  isSignedIn: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ isSignedIn }) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      console.warn('Firebase Auth not configured. Add VITE_FIREBASE_* env vars.');
      return;
    }
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.error('Sign in failed', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  if (!getFirebaseAuth()) return null;

  if (isSignedIn) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-300 transition-smooth disabled:opacity-50"
      >
        {loading ? <LoaderIcon size={16} className="animate-spin" /> : <LogOutIcon size={16} />}
        Sign out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={loading}
      className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-smooth disabled:opacity-50"
    >
      {loading ? 'Signing in…' : 'Sign in with Google'}
    </button>
  );
};

export default AuthButton;
