import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { COLORS } from '@/constants/colors';
import type { WeightEntry } from '@/lib/weight-mocks';

import { CHART_CONFIG, CHART_HEIGHT, CHART_PADDING } from '../constants/chartConfig';
import { prepareChartData } from '../utils/prepareChartData';

type WeightChartProps = {
  entries: WeightEntry[];
};

export function WeightChart(props: WeightChartProps) {
  const { entries } = props;

  if (entries.length === 0) {
    return null;
  }

  const { labels, weights } = prepareChartData(entries);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <LineChart
        data={{ labels, datasets: [{ data: weights }] }}
        width={screenWidth - CHART_PADDING}
        height={CHART_HEIGHT}
        chartConfig={CHART_CONFIG}
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
