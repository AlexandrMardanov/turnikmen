import { Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.primary },
      }}
    >
      <Stack.Screen name='login' />
      <Stack.Screen name='signup' />
    </Stack>
  );
}
