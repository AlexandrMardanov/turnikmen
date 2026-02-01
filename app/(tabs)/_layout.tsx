import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

import { COLORS } from '@/constants/colors';

export default function TabsLayout() {
  return (
    <NativeTabs tintColor={COLORS.accent.primary}>
      <NativeTabs.Trigger name='(dashboard)'>
        <Label>Дашборд</Label>
        <Icon sf='square.grid.2x2.fill' />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
