import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { COLORS } from '@/constants/colors';
import type { WeightEntry } from '@/lib/weight-mocks';

import { formatDateLabel } from '../utils/dateFormatters';

type WeightChartProps = {
  entries: WeightEntry[];
};

export function WeightChart(props: WeightChartProps) {
  const { entries } = props;

  if (entries.length === 0) {
    return null;
  }

  // Prepare data for chart (reverse to show oldest to newest)
  const sortedEntries = [...entries].reverse();
  // Format labels (dates) - show only first, middle, and last
  const labels = sortedEntries.map((entry, index) => {
    const isFirst = index === 0;
    const isLast = index === sortedEntries.length - 1;
    const isMiddle = index === Math.floor(sortedEntries.length / 2);

    if (isFirst || isMiddle || isLast) {
      return formatDateLabel(entry.date);
    }

    return '';
  });
  // Extract weights
  const weights = sortedEntries.map((entry) => entry.weight);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <LineChart
        data={{ labels, datasets: [{ data: weights }] }}
        width={screenWidth - 48}
        height={160}
        chartConfig={{
          backgroundColor: COLORS.background.primary,
          backgroundGradientFrom: COLORS.background.primary,
          backgroundGradientTo: COLORS.background.primary,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: COLORS.accent.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});
