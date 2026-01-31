import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

export function LoginFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Немає облікового запису? </Text>
      <Link href='/(auth)/signup' asChild>
        <Pressable>
          <Text style={styles.link}>Зареєструватися</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  link: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontFamily: FONTS.semiBold,
  },
});
