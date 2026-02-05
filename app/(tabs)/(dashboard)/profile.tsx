import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { LogoutButton } from '@/components/profile/components/LogoutButton';
import { useScreenOptions } from '@/hooks/useScreenOptions';
import { useTabBarVisibility } from '@/hooks/useTabBarVisibility';

export default function Profile() {
  useScreenOptions({
    title: 'Профіль',
    headerRight: () => <LogoutButton />,
  });
  useTabBarVisibility(false);

  return <ProfileScreen />;
}
