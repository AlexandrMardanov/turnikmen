import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

import { ScreenContainer } from '../shared/ScreenContainer';
import { WeightEntryItem } from './components/WeightEntryItem';
import { useWeightData } from './hooks/useWeightData';

export function WeightHistoryScreen() {
  const { entries, loading, error, getEntriesWithChanges, deleteEntry, refresh } = useWeightData();

  const entriesWithChanges = getEntriesWithChanges(entries);

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (err) {
      console.error('Error deleting entry:', err);
      Alert.alert('Помилка', 'Не вдалося видалити запис');
    }
  };

  if (loading && entries.length === 0) {
    return (
      <ScreenContainer>
        <ActivityIndicator size='large' color={COLORS.accent.primary} />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text style={styles.errorText}>{error} erro</Text>
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
    <ScreenContainer>
      <FlatList
        data={entriesWithChanges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WeightEntryItem entry={item} change={item.change} onDelete={handleDelete} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={COLORS.accent.primary} />}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
});
