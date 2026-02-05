import { useFocusEffect } from 'expo-router';

import { useTabBar } from '@/contexts/TabBarContext';

export function useTabBarVisibility(visible: boolean) {
  const { setIsTabBarHidden } = useTabBar();

  useFocusEffect(() => {
    setIsTabBarHidden(!visible);

    return () => {
      setIsTabBarHidden(false);
    };
  });
}
