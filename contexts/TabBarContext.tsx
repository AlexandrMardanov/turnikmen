import React, { createContext, useContext } from 'react';

import { useTabBarState } from './hooks/useTabBarState';

type TabBarContextType = {
  isTabBarHidden: boolean;
  setIsTabBarHidden: (hidden: boolean) => void;
};

type TabBarProviderProps = {
  children: React.ReactNode;
};

export const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export function TabBarProvider(props: TabBarProviderProps) {
  const { children } = props;

  const { isTabBarHidden, setIsTabBarHidden } = useTabBarState();

  const value = {
    isTabBarHidden,
    setIsTabBarHidden,
  };

  return <TabBarContext.Provider value={value}>{children}</TabBarContext.Provider>;
}

export function useTabBar() {
  const context = useContext(TabBarContext);

  if (context === undefined) {
    throw new Error('useTabBar має бути використаний всередині TabBarProvider');
  }

  return context;
}
