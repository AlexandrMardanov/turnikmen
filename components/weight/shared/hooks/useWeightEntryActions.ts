import { Alert } from 'react-native';

import { useRouter } from 'expo-router';

import { useWeightData } from './useWeightData';

type UseWeightEntryActionsParams = {
  entryId: string;
};

export function useWeightEntryActions(params: UseWeightEntryActionsParams) {
  const { entryId } = params;
  const router = useRouter();
  const { deleteEntry } = useWeightData();

  function handleDelete() {
    Alert.alert('Видалити запис', 'Ви впевнені, що хочете видалити цей запис?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () => {
          deleteEntry(entryId).catch((err) => {
            Alert.alert('Помилка', (err as Error).message);
          });
        },
      },
    ]);
  }

  function handleEdit() {
    router.push(`/(tabs)/(weight)/add-edit?id=${entryId}`);
  }

  return {
    handleDelete,
    handleEdit,
  };
}
