import { useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export function useSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleSignIn() {
    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Помилка входу:', error);
      Alert.alert('Помилка', 'Виникла помилка при вході');
    } finally {
      setLoading(false);
    }
  }

  return { email, password, loading, handleSignIn, setEmail, setPassword };
}
