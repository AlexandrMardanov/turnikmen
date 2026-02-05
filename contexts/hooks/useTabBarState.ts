import { useState } from 'react';

export function useTabBarState() {
  const [isTabBarHidden, setIsTabBarHidden] = useState(false);

  function setTabBarHidden(hidden: boolean) {
    setIsTabBarHidden(hidden);
  }

  return {
    isTabBarHidden,
    setIsTabBarHidden: setTabBarHidden,
  };
}
