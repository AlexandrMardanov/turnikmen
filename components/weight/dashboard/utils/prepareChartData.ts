import type { WeightEntry } from '@/lib/weight-mocks';

import { formatDateLabel } from './formatDateLabel';

export type ChartData = {
  labels: string[];
  weights: number[];
};

/**
 * Prepares weight entries for chart display
 * @param entries - Array of weight entries
 * @returns Chart data with formatted labels and weights
 */
export function prepareChartData(entries: WeightEntry[]): ChartData {
  // Reverse to show oldest to newest
  const sortedEntries = [...entries].reverse();

  const labels: string[] = [];
  const weights: number[] = [];

  const middleIndex = Math.floor(sortedEntries.length / 2);
  const lastIndex = sortedEntries.length - 1;

  sortedEntries.forEach((entry, index) => {
    const isFirst = index === 0;
    const isLast = index === lastIndex;
    const isMiddle = index === middleIndex;

    // Add label only for first, middle, and last entries
    labels.push(isFirst || isMiddle || isLast ? formatDateLabel(entry.date) : '');
    weights.push(entry.weight);
  });

  return { labels, weights };
}
