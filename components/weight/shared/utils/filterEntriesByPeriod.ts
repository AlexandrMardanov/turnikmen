import type { WeightEntry } from '@/lib/weight-mocks';

export type PeriodFilter = 'month' | '3months' | 'year' | 'all';

/**
 * Filters weight entries by time period
 * @param entries - Array of weight entries to filter
 * @param period - Time period to filter by
 * @returns Filtered entries
 */
export function filterEntriesByPeriod(entries: WeightEntry[], period: PeriodFilter): WeightEntry[] {
  if (period === 'all') {
    return entries;
  }

  const now = new Date();
  const cutoffDate = new Date();

  switch (period) {
    case 'month':
      cutoffDate.setMonth(now.getMonth() - 1);
      break;
    case '3months':
      cutoffDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  return entries.filter((entry) => new Date(entry.date) >= cutoffDate);
}
