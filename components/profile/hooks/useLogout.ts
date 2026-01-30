import { Alert } from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export const useLogout = () => {
  const { signOut } = useAuth();

  async function handleLogout() {
    Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
      {
        text: 'Скасувати',
        style: 'cancel',
      },
      {
        text: 'Вийти',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/login');
          } catch (error) {
            console.error('Помилка виходу:', error);
            Alert.alert('Помилка', 'Не вдалося вийти з системи');
          }
        },
      },
    ]);
  }

  return { handleLogout };
};
