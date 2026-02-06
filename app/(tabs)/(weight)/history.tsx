import { WeightHistoryScreen } from '@/components/weight/history/WeightHistoryScreen';
import { AddWeightButton } from '@/components/weight/shared/components/AddWeightButton';
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
