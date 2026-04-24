/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'companion'>('seeker');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Force select_account to help with login issues
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          role: 'seeker',
          isVerified: false,
          profileSetup: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setError('Login popup was blocked. Please enable popups or open this app in a new tab.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Login cancelled. Please try again.');
      } else if (err.code === 'auth/internal-error' || err.code === 'auth/network-request-failed') {
        setError('Connection issues. Try opening the app in a new tab using the button below.');
      } else {
        setError('Google login failed. If you are in the preview, please use the button below to open in a new tab.');
      }
    }
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: email.split('@')[0],
          role: role,
          isVerified: false,
          profileSetup: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-baham-cream px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[40px] shadow-xl w-full max-w-md border border-baham-sand/30"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-baham-ink">
          {isLogin ? 'Welcome Back' : 'Join Bahäm'}
        </h2>
        <p className="text-center text-baham-slate mb-8 text-sm">
          {isLogin ? 'Sign in to your account' : 'Start your journey with us today'}
        </p>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-4 bg-white border border-baham-sand/50 text-baham-ink rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 mb-8"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/hf/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-baham-sand/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-baham-ink/30 font-bold tracking-widest">Or with email</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-baham-ink/40 mb-3 ml-4">Choose your role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('seeker')}
                  className={`py-3 rounded-2xl font-bold transition-all ${role === 'seeker' ? 'bg-baham-blue text-white shadow-lg' : 'bg-baham-sand/30 text-baham-blue'}`}
                >
                  Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('companion')}
                  className={`py-3 rounded-2xl font-bold transition-all ${role === 'companion' ? 'bg-baham-blue text-white shadow-lg' : 'bg-baham-sand/30 text-baham-blue'}`}
                >
                  Companion
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-baham-ink/40 mb-2 ml-4">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-baham-sand/20 rounded-2xl border-none focus:ring-2 focus:ring-baham-blue transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-baham-ink/40 mb-2 ml-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-baham-sand/20 rounded-2xl border-none focus:ring-2 focus:ring-baham-blue transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-baham-blue text-white rounded-full font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-baham-ink/40">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-baham-blue hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div className="mt-12 pt-6 border-t border-baham-sand/20 text-center">
          <p className="text-xs text-baham-ink/30 mb-4 font-medium italic">
            Having trouble signing in?
          </p>
          <button
            onClick={openInNewTab}
            className="text-xs font-bold text-baham-blue bg-baham-blue/10 px-4 py-2 rounded-full hover:bg-baham-blue/20 transition-all flex items-center gap-2 mx-auto"
          >
            Open in New Tab <ArrowRight size={12} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
