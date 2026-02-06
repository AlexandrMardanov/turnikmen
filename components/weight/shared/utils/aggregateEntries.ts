import type { WeightEntry } from '@/lib/weight-mocks';

/**
 * Aggregates weight entries to a maximum number of points by grouping and averaging
 * @param entries - Array of weight entries to aggregate
 * @param maxPoints - Maximum number of points to return (default: 12)
 * @returns Aggregated entries sorted by date (newest first)
 */
export function aggregateEntries(entries: WeightEntry[], maxPoints: number = 12): WeightEntry[] {
  if (entries.length <= maxPoints) {
    return entries;
  }

  // Calculate how many entries should be in each group
  const groupSize = Math.ceil(entries.length / maxPoints);

  // Sort entries by date (oldest to newest) for proper grouping
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const aggregated: WeightEntry[] = [];

  // Group entries and aggregate
  for (let i = 0; i < sortedEntries.length; i += groupSize) {
    const group = sortedEntries.slice(i, i + groupSize);

    // Use the last (most recent) date from the group
    const lastEntry = group[group.length - 1];

    // Calculate average weight
    const avgWeight = group.reduce((sum, e) => sum + e.weight, 0) / group.length;

    aggregated.push({
      ...lastEntry,
      weight: Math.round(avgWeight * 10) / 10, // Round to 1 decimal place
    });
  }

  // Sort by date (newest first)
  return aggregated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
