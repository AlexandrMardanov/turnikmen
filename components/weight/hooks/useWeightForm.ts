import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { getWeightEntry } from '@/lib/weight-mocks';

import { useWeightData } from './useWeightData';

type UseWeightFormProps = {
  id?: string;
};

export function useWeightForm(props: UseWeightFormProps) {
  const { id } = props;
  const router = useRouter();
  const { user } = useAuth();
  const { addEntry, updateEntry } = useWeightData();

  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(!!id);

  // Load existing entry if editing
  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadEntry() {
      try {
        setInitialLoading(true);
        const entry = await getWeightEntry(id!);

        if (entry) {
          setWeight(entry.weight.toString());
          setDate(new Date(entry.date));
        }
      } catch (err) {
        console.error('Помилка завантаження запису:', err);
        setError('Помилка завантаження запису');
      } finally {
        setInitialLoading(false);
      }
    }

    loadEntry();
  }, [id]);

  const validateForm = (): boolean => {
    setError(null);

    if (!weight.trim()) {
      Alert.alert('Помилка', 'Введіть вагу');
      return false;
    }

    const weightNum = parseFloat(weight);

    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Вага повинна бути більше 0');
      return false;
    }

    if (weightNum > 200) {
      setError('Вага занадто велика');
      return false;
    }

    return true;
  };

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    if (!user?.id) {
      setError('Користувач не авторизований');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const weightNum = parseFloat(weight);
      const dateStr = date.toISOString().split('T')[0];

      if (id) {
        await updateEntry(id, {
          weight: weightNum,
          date: dateStr,
        });
      } else {
        await addEntry({
          user_id: user.id,
          weight: weightNum,
          date: dateStr,
        });
      }

      router.back();
    } catch (err) {
      console.error('Error saving weight entry:', err);
      setError('Помилка збереження');
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.back();
  }

  return {
    weight,
    setWeight,
    date,
    setDate,
    loading,
    error,
    initialLoading,
    handleSubmit,
    handleCancel,
  };
}
