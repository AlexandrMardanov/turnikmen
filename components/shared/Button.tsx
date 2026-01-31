import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

type ButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'danger';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export function Button(props: ButtonProps) {
  const { title, loading = false, variant = 'primary', onPress, disabled, style, ...restProps } = props;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.button.text} />
      ) : (
        <Text style={[styles.buttonText, variant === 'danger' && styles.buttonTextDanger]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    backgroundColor: COLORS.button.primary,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: COLORS.button.text,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  buttonTextDanger: {
    color: COLORS.button.danger,
  },
});
