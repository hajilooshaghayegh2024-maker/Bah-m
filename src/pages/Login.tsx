/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { LogIn, UserPlus } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'companion'>('seeker');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          role: 'seeker', // Default role for social login if new
          isVerified: false,
          profileSetup: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
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
        <h2 className="text-3xl font-bold text-center mb-8 text-baham-ink">
          {isLogin ? 'Welcome Back' : 'Join Bahäm'}
        </h2>
        
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
            className="w-full py-4 bg-baham-ink text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={handleGoogleSignIn}
            className="text-sm font-medium text-baham-ink/60 hover:text-baham-blue transition-colors"
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-baham-ink/40">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-baham-blue hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
