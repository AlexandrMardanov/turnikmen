import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/shared/Button';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import type { WeightEntry } from '@/lib/weight-mocks';

import { WeightEntryItem } from '../../shared/components/WeightEntryItem';
import { RECENT_ENTRIES_LIMIT } from '../constants/recentEntriesLimit';

type WeightEntryWithChange = WeightEntry & { change: number };

type RecentEntriesSectionProps = {
  entries: WeightEntryWithChange[];
  totalCount: number;
  onDelete: (id: string) => void;
  onShowAll: () => void;
};

export function RecentEntriesSection(props: RecentEntriesSectionProps) {
  const { entries, totalCount, onDelete, onShowAll } = props;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Останні записи</Text>
        {totalCount > RECENT_ENTRIES_LIMIT && (
          <Button title='Показати всі' onPress={onShowAll} variant='secondary' size='small' transparent />
        )}
      </View>
      {entries.length === 0 ? (
        <Text style={styles.noDataText}>Немає записів за цей період</Text>
      ) : (
        entries.map((entry) => (
          <WeightEntryItem key={entry.id} entry={entry} change={entry.change} onDelete={onDelete} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
