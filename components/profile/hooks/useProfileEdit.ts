import { useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export function useProfileEdit() {
  const { user, updateProfile } = useAuth();
  const userName = user?.user_metadata?.name || '';
  const [name, setName] = useState(userName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSaveName() {
    try {
      setIsSaving(true);
      await updateProfile(name);
      Alert.alert('Успіх', `Ім'я успішно збережено`);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Помилка збереження імені:', error);
      Alert.alert('Помилка', `Не вдалося зберегти ім'я`);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancelEdit() {
    setIsModalVisible(false);
    setName(userName);
  }

  function openModal() {
    setIsModalVisible(true);
  }

  return {
    name,
    setName,
    isModalVisible,
    isSaving,
    handleSaveName,
    handleCancelEdit,
    openModal,
    user,
  };
}
