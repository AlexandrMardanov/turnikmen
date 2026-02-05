import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VectorIcon } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { COLORS } from '@/constants/colors';
import { useTabBar } from '@/contexts/TabBarContext';

export default function TabsLayout() {
  const { isTabBarHidden } = useTabBar();

  return (
    <NativeTabs tintColor={COLORS.accent.primary} hidden={isTabBarHidden}>
      <NativeTabs.Trigger name='(dashboard)'>
        <NativeTabs.Trigger.Label>Дашборд</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf='square.grid.2x2.fill' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='(weight)'>
        <NativeTabs.Trigger.Label>Вага</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={<VectorIcon family={MaterialCommunityIcons} name='scale-bathroom' />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
