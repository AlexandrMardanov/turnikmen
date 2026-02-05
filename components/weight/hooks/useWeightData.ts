import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import {
  type WeightEntry,
  type WeightEntryCreate,
  type WeightEntryUpdate,
  addWeightEntry,
  deleteWeightEntry,
  getWeightEntries,
  updateWeightEntry,
} from '@/lib/weight-mocks';

export type PeriodFilter = 'month' | '3months' | 'year' | 'all';

export function useWeightData() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEntries = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getWeightEntries(user.id);
      setEntries(data);
    } catch (err) {
      console.error('Помилка завантаження даних:', err);
      setError('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  function aggregateToMaxPoints(entriesToAggregate: WeightEntry[], maxPoints: number = 12): WeightEntry[] {
    if (entriesToAggregate.length <= maxPoints) {
      return entriesToAggregate;
    }

    // Calculate how many entries should be in each group
    const groupSize = Math.ceil(entriesToAggregate.length / maxPoints);

    // Sort entries by date (oldest to newest) for proper grouping
    const sortedEntries = [...entriesToAggregate].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

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

  function filterByPeriod(period: PeriodFilter): WeightEntry[] {
    let filtered: WeightEntry[];

    if (period === 'all') {
      filtered = entries;
    } else {
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

      filtered = entries.filter((entry) => new Date(entry.date) >= cutoffDate);
    }

    // Aggregate to maximum 12 points for cleaner chart
    return aggregateToMaxPoints(filtered, 12);
  }

  function getEntriesWithChanges(filteredEntries: WeightEntry[]) {
    return filteredEntries.map((entry, index) => {
      const previousEntry = filteredEntries[index + 1];
      const change = previousEntry ? entry.weight - previousEntry.weight : 0;

      return {
        ...entry,
        change,
      };
    });
  }

  const addEntry = useCallback(
    async (data: WeightEntryCreate) => {
      if (!user?.id) {
        throw new Error('Користувач не авторизований');
      }

      try {
        await addWeightEntry(data);
        await loadEntries();
      } catch (err) {
        throw err;
      }
    },
    [user?.id, loadEntries]
  );

  const updateEntry = useCallback(
    async (id: string, data: WeightEntryUpdate) => {
      try {
        await updateWeightEntry(id, data);
        await loadEntries();
      } catch (err) {
        throw err;
      }
    },
    [loadEntries]
  );

  const deleteEntry = useCallback(
    async (id: string) => {
      try {
        await deleteWeightEntry(id);
        await loadEntries();
      } catch (err) {
        throw err;
      }
    },
    [loadEntries]
  );

  return {
    entries,
    loading,
    error,
    filterByPeriod,
    getEntriesWithChanges,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: loadEntries,
  };
}
