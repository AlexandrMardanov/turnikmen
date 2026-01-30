import React, { createContext, useContext } from 'react';

import { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

import { useAuthOperations } from './hooks/useAuthOperations';
import { useAuthSession } from './hooks/useAuthSession';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const { signIn, signUp, signOut } = useAuthOperations();
  const { user, loading } = useAuthSession();

  async function updateProfile(name: string) {
    if (!user) {
      throw new Error('Юзер не знайдений');
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        name: name.trim(),
      },
    });

    if (error) {
      throw error;
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth має бути використаний всередині AuthProvider');
  }

  return context;
}
