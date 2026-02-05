import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

type ButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  transparent?: boolean;
};

export function Button(props: ButtonProps) {
  const {
    title,
    loading = false,
    variant = 'primary',
    size = 'large',
    onPress,
    disabled,
    style,
    transparent = false,
    ...restProps
  } = props;
  const isDisabled = disabled || loading;

  function getSizeStyles() {
    if (size === 'small') {
      return styles.buttonSmall;
    }
    if (size === 'medium') {
      return styles.buttonMedium;
    }
    return null;
  }

  function getTextSizeStyles() {
    if (size === 'small') {
      return styles.buttonTextSmall;
    }
    if (size === 'medium') {
      return styles.buttonTextMedium;
    }
    return null;
  }

  function getTextColorStyles() {
    if (variant === 'secondary') {
      return { color: COLORS.text.secondary };
    }
    if (variant === 'danger') {
      return { color: COLORS.button.danger };
    }
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getSizeStyles(),
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
        transparent && styles.buttonTransparent,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.button.text} />
      ) : (
        <Text style={[styles.buttonText, getTextSizeStyles(), getTextColorStyles()]}>{title}</Text>
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
    borderWidth: 0.5,
    borderColor: COLORS.border.default,
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
    borderRadius: 16,
    marginTop: 0,
  },
  buttonMedium: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 40,
    borderRadius: 20,
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
  buttonTextSmall: {
    fontSize: 12,
  },
  buttonTextMedium: {
    fontSize: 14,
  },
  buttonTextDanger: {
    color: COLORS.button.danger,
  },
  buttonTextSecondary: {
    color: COLORS.text.secondary,
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
