/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'seeker' | 'companion' | 'admin';
  isVerified: boolean;
  profileSetup: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
    radius: number;
  };
  companionData?: {
    categories: string[];
    languages: string[];
    interests: string[];
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    availability: string[];
  };
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  language: 'fi' | 'en';
  setLanguage: (lang: 'fi' | 'en') => void;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'fi' | 'en'>('fi');

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Initialize basic profile if it doesn't exist
            const basicProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              role: 'seeker',
              isVerified: false,
              profileSetup: false,
            };
            setDoc(docRef, basicProfile);
            setProfile(basicProfile);
          }
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signOut = () => auth.signOut();

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, data);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, language, setLanguage, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
