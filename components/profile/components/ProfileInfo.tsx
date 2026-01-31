import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';

import { InfoItem } from './InfoItem';

type ProfileInfoProps = {
  name: string;
  email: string;
  onEditPress: () => void;
};

export function ProfileInfo(props: ProfileInfoProps) {
  const { name, email, onEditPress } = props;

  return (
    <View>
      <View style={styles.nameRow}>
        <InfoItem label="Ваше ім'я" value={name || 'Не вказано'} />
        <TouchableOpacity style={styles.editIconButton} onPress={onEditPress} activeOpacity={0.7}>
          <Ionicons name='create-outline' size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      <InfoItem label='Електронна пошта' value={email || 'Не вказано'} />
    </View>
  );
}

const styles = StyleSheet.create({
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  editIconButton: {
    padding: 8,
    marginLeft: 8,
    marginTop: -4,
  },
});
