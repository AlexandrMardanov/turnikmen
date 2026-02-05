import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

import { Button } from '../shared/Button';
import { FormContainer } from '../shared/FormContainer';
import { Input } from '../shared/Input';
import { ScreenContainer } from '../shared/ScreenContainer';
import { useWeightForm } from './hooks/useWeightForm';

type AddEditWeightFormProps = {
  id?: string;
};

export function AddEditWeightForm(props: AddEditWeightFormProps) {
  const { id } = props;
  const { weight, setWeight, date, setDate, loading, error, initialLoading, handleSubmit, handleCancel } =
    useWeightForm({ id });

  if (initialLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size='large' color={COLORS.accent.primary} />
      </ScreenContainer>
    );
  }

  return (
    <FormContainer centered={false}>
      <Text style={styles.label}>Вага (кг)</Text>
      <Input
        value={weight}
        onChangeText={setWeight}
        placeholder='Введіть вагу'
        keyboardType='decimal-pad'
        autoFocus={!id}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.label}>Дата</Text>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={date}
          mode='date'
          display='inline'
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          maximumDate={new Date()}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button title='Зберегти' onPress={handleSubmit} loading={loading} variant='primary' style={styles.saveButton} />
        <Button
          title='Скасувати'
          onPress={handleCancel}
          variant='danger'
          style={styles.cancelButton}
          disabled={loading}
        />
      </View>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  datePickerContainer: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    marginBottom: 16,
    overflow: 'hidden',
  },
  errorText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text.danger,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
});
