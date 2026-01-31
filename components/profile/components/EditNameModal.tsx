import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { BlurView } from 'expo-blur';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

type EditNameModalProps = {
  visible: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

export function EditNameModal(props: EditNameModalProps) {
  const { visible, name, onChangeName, onSave, onCancel, isSaving } = props;

  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onCancel}>
      <BlurView intensity={20} tint='light' style={styles.modalOverlay}>
        <Pressable style={styles.overlayPressable} onPress={onCancel}>
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
              <Button
                title='Зберегти'
                onPress={onSave}
                loading={isSaving}
                variant='primary'
                style={styles.saveButton}
              />
              <Button title='Скасувати' onPress={onCancel} variant='danger' style={styles.cancelButton} />
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  overlayPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background.overlay,
  },
  modalContent: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
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
