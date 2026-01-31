import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

export function SignUpFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Вже маєте обліковий запис? </Text>
      <Link href='/(auth)/login' asChild>
        <Pressable>
          <Text style={styles.link}>Увійти</Text>
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
