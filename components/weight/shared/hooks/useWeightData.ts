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

import { MAX_CHART_POINTS } from '../constants/maxChartPoints';
import { aggregateEntries } from '../utils/aggregateEntries';
import { calculateWeightChanges } from '../utils/calculateWeightChanges';
import { type PeriodFilter, filterEntriesByPeriod } from '../utils/filterEntriesByPeriod';

export type { PeriodFilter };

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

  function filterByPeriod(period: PeriodFilter): WeightEntry[] {
    const filtered = filterEntriesByPeriod(entries, period);
    return aggregateEntries(filtered, MAX_CHART_POINTS);
  }

  function getEntriesWithChanges(filteredEntries: WeightEntry[]) {
    return calculateWeightChanges(filteredEntries);
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

  const entriesWithChanges = getEntriesWithChanges(entries);

  return {
    entries,
    entriesWithChanges,
    loading,
    error,
    filterByPeriod,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: loadEntries,
  };
}
