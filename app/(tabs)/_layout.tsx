import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        sceneStyle: { backgroundColor: '#fff' },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Дашборд',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/profile')} style={{ marginRight: 24 }}>
              <Ionicons name='person-circle-outline' size={28} color='#fff' />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />,
        }}
      />
      <Tabs.Screen name='profile' options={{ href: null }} />
    </Tabs>
  );
}
