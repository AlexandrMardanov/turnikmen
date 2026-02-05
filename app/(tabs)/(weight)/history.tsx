import { WeightHistoryScreen } from '@/components/weight/WeightHistoryScreen';
import { AddWeightButton } from '@/components/weight/components/AddWeightButton';
import { useScreenOptions } from '@/hooks/useScreenOptions';
import { useTabBarVisibility } from '@/hooks/useTabBarVisibility';

export default function WeightHistory() {
  useScreenOptions({
    title: 'Історія ваги',
    headerRight: () => <AddWeightButton />,
  });
  useTabBarVisibility(false);

  return <WeightHistoryScreen />;
}
