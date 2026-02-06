import { WeightDashboardScreen } from '@/components/weight/dashboard/WeightDashboardScreen';
import { AddWeightButton } from '@/components/weight/shared/components/AddWeightButton';
import { useScreenOptions } from '@/hooks/useScreenOptions';

export default function Weight() {
  useScreenOptions({
    title: 'Вага',
    headerRight: () => <AddWeightButton />,
  });

  return <WeightDashboardScreen />;
}
