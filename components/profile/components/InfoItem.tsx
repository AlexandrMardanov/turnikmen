import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

type InfoItemProps = {
  label: string;
  value: string;
};

export function InfoItem(props: InfoItemProps) {
  const { label, value } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
});
