import { WeightDashboardScreen } from '@/components/weight/WeightDashboardScreen';
import { AddWeightButton } from '@/components/weight/components/AddWeightButton';
import { useScreenOptions } from '@/hooks/useScreenOptions';

export default function Weight() {
  useScreenOptions({
    title: 'Вага',
    headerRight: () => <AddWeightButton />,
  });

  return <WeightDashboardScreen />;
}
