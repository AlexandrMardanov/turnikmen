import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState(props: EmptyStateProps) {
  const { title, message } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
