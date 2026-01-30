import { StyleSheet, View } from 'react-native';

import { ProfileCard } from '@/components/profile/ProfileCard';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ProfileCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
