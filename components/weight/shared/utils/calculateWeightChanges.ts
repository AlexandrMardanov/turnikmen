import type { WeightEntry } from '@/lib/weight-mocks';

export type WeightEntryWithChange = WeightEntry & { change: number };

/**
 * Calculates weight changes between consecutive entries
 * @param entries - Array of weight entries (should be sorted by date, newest first)
 * @returns Entries with calculated change values
 */
export function calculateWeightChanges(entries: WeightEntry[]): WeightEntryWithChange[] {
  return entries.map((entry, index) => {
    const previousEntry = entries[index + 1];
    const change = previousEntry ? entry.weight - previousEntry.weight : 0;

    return {
      ...entry,
      change,
    };
  });
}
