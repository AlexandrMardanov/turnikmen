import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

import type { PeriodFilter as PeriodFilterType } from '../../shared/hooks/useWeightData';

type PeriodFilterProps = {
  selectedPeriod: PeriodFilterType;
  onPeriodChange: (period: PeriodFilterType) => void;
};

const PERIODS: { value: PeriodFilterType; label: string }[] = [
  { value: 'month', label: 'Місяць' },
  { value: '3months', label: '3 місяці' },
  { value: 'year', label: 'Рік' },
  { value: 'all', label: 'Весь час' },
];

export function PeriodFilter(props: PeriodFilterProps) {
  const { selectedPeriod, onPeriodChange } = props;

  return (
    <View style={styles.container}>
      {PERIODS.map((period) => (
        <TouchableOpacity
          key={period.value}
          style={[styles.button, selectedPeriod === period.value && styles.buttonActive]}
          onPress={() => onPeriodChange(period.value)}
        >
          <Text style={[styles.buttonText, selectedPeriod === period.value && styles.buttonTextActive]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonActive: {
    backgroundColor: COLORS.accent.primary,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  buttonTextActive: {
    color: COLORS.text.inverse,
  },
});
