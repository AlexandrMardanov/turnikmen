import { useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export function useSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  async function handleSignUp() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не збігаються');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль повинен бути не менше 6 символів');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      Alert.alert('Помилка', 'Виникла помилка при реєстрації');
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSignUp,
  };
}
