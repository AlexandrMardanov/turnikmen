import { StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';

type HeaderIconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
};

export function HeaderIconButton(props: HeaderIconButtonProps) {
  const { iconName, onPress, color = COLORS.text.primary, size = 24 } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },
});
