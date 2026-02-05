import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

import { Button } from '../shared/Button';
import { ScreenContainer } from '../shared/ScreenContainer';
import { PeriodFilter } from './components/PeriodFilter';
import { WeightChart } from './components/WeightChart';
import { WeightEntryItem } from './components/WeightEntryItem';
import { type PeriodFilter as PeriodFilterType, useWeightData } from './hooks/useWeightData';

export function WeightDashboardScreen() {
  const router = useRouter();
  const { entries, loading, error, filterByPeriod, getEntriesWithChanges, deleteEntry } = useWeightData();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilterType>('month');

  const filteredEntries = filterByPeriod(selectedPeriod);
  const entriesWithChanges = getEntriesWithChanges(entries);
  const recentEntries = entriesWithChanges.slice(0, 5);

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleShowHistory = () => {
    router.push('/(tabs)/(weight)/history');
  };

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size='large' color={COLORS.accent.primary} />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text style={styles.errorText}>{error}</Text>
      </ScreenContainer>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Немає записів</Text>
        <Text style={styles.emptyText}>Почніть відстежувати свою вагу, щоб бачити прогрес</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.periodFilterContainer}>
        <PeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </View>
      <View style={styles.chartContainer}>
        <WeightChart entries={filteredEntries} />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Останні записи</Text>
          {entries.length > 5 && (
            <Button title='Показати всі' onPress={handleShowHistory} variant='secondary' size='small' transparent />
          )}
        </View>
        {recentEntries.length === 0 ? (
          <Text style={styles.noDataText}>Немає записів за цей період</Text>
        ) : (
          recentEntries.map((entry) => (
            <WeightEntryItem key={entry.id} entry={entry} change={entry.change} onDelete={handleDelete} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 24,
  },
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
  errorText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.accent.danger,
    textAlign: 'center',
  },
  periodFilterContainer: {
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  section: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.text.primary,
  },
  noDataText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
