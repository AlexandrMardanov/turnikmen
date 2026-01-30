import { useState } from 'react';
import {
  FocusEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import { COLORS } from '@/constants/colors';

type InputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<FocusEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<FocusEvent>) => void;
  style?: StyleProp<ViewStyle>;
};

export function Input(props: InputProps) {
  const { value, onChangeText, onFocus, onBlur, style, placeholderTextColor, ...restProps } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused, style]}
      value={value}
      onChangeText={onChangeText}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      placeholderTextColor={COLORS.text + '80'}
      autoCorrect={false}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    marginBottom: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.text + '20',
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
});
