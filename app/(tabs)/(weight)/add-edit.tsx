import { useLocalSearchParams } from 'expo-router';

import { AddEditWeightForm } from '@/components/weight/AddEditWeightForm';
import { useScreenOptions } from '@/hooks/useScreenOptions';
import { useTabBarVisibility } from '@/hooks/useTabBarVisibility';

export default function AddEditWeight() {
  const params = useLocalSearchParams<{ id?: string }>();

  useScreenOptions({
    title: params.id ? 'Редагувати запис' : 'Додати запис',
  });
  useTabBarVisibility(false);

  return <AddEditWeightForm id={params.id} />;
}
