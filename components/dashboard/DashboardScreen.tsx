import { StyleSheet, Text } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

import { ScreenContainer } from '../shared/ScreenContainer';

export function DashboardScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>Привіт</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
});
