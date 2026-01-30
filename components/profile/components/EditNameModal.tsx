import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { COLORS } from '@/constants/colors';

type EditNameModalProps = {
  visible: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

export function EditNameModal({ visible, name, onChangeName, onSave, onCancel, isSaving }: EditNameModalProps) {
  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onCancel}>
      <Pressable style={styles.modalOverlay} onPress={onCancel}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalTitle}>{`Редагувати ім'я`}</Text>
          <Input
            value={name}
            onChangeText={onChangeName}
            placeholder="Введіть ваше ім'я"
            autoCapitalize='words'
            style={styles.nameInput}
          />
          <View style={styles.buttonRow}>
            <Button title='Зберегти' onPress={onSave} loading={isSaving} variant='primary' style={styles.saveButton} />
            <Button title='Скасувати' onPress={onCancel} variant='secondary' style={styles.cancelButton} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  nameInput: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
});
