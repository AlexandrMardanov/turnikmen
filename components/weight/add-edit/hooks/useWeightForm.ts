import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { getWeightEntry } from '@/lib/weight-mocks';

import { useWeightData } from '../../shared/hooks/useWeightData';
import { validateWeightInput } from '../utils/validateWeightInput';

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
      } finally {
        setInitialLoading(false);
      }
    }

    loadEntry();
  }, [id]);

  function validateForm(): boolean {
    const validation = validateWeightInput(weight);

    if (!validation.isValid) {
      Alert.alert('Помилка', 'Введіть вагу');
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    if (!user?.id) {
      Alert.alert('Помилка', 'Користувач не авторизований');
      return;
    }

    setLoading(true);

    const weightNum = parseFloat(weight);
    const dateStr = date.toISOString().split('T')[0];

    const savePromise = id
      ? updateEntry(id, {
          weight: weightNum,
          date: dateStr,
        })
      : addEntry({
          user_id: user.id,
          weight: weightNum,
          date: dateStr,
        });

    savePromise
      .then(() => {
        router.back();
      })
      .catch((err) => {
        console.error('Невдалося зберегти запис:', err);
        Alert.alert('Помилка', 'Помилка збереження');
      })
      .finally(() => {
        setLoading(false);
      });
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
    initialLoading,
    handleSubmit,
    handleCancel,
  };
}
