import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { User } from '@supabase/supabase-js';
import * as SplashScreen from 'expo-splash-screen';

import { supabase } from '@/lib/supabase';

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          Alert.alert('Помилка', 'Не вдалося отримати сесію');
          return;
        }
        setUser(session?.user ?? null);
      })
      .catch(() => {
        Alert.alert('Помилка', 'Не вдалося отримати сесію');
        return;
      })
      .finally(async () => {
        setLoading(false);
        // Hide splash screen after auth check is complete
        await SplashScreen.hideAsync();
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}
