import { useRouter } from 'expo-router';

import { HeaderIconButton } from '@/components/shared/HeaderIconButton';

export function AddWeightButton() {
  const router = useRouter();

  return <HeaderIconButton iconName='add' onPress={() => router.push('/(tabs)/(weight)/add-edit')} />;
}
