// Base color palette
const palette = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  orange: '#FF6B35',
  green: '#10B981',
  red: '#FF3B30',
};

// Semantic colors
export const COLORS = {
  // Text colors
  text: {
    primary: palette.black,
    secondary: palette.gray[600],
    tertiary: palette.gray[400],
    inverse: palette.white,
    danger: palette.red,
  },

  // Background colors
  background: {
    primary: palette.white,
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
    overlay: 'rgba(0, 0, 0, 0.3)',
  },

  // Button colors
  button: {
    primary: palette.gray[200],
    primaryPressed: palette.gray[300],
    danger: palette.red,
    dangerPressed: palette.red,
    disabled: palette.gray[200],
    text: palette.black,
    textInverse: palette.white,
  },

  // Accent colors
  accent: {
    primary: palette.orange,
    success: palette.green,
    danger: palette.red,
  },

  // Border colors
  border: {
    default: 'rgba(0, 0, 0, 0.12)',
    focus: palette.orange,
  },

  // Shadow color
  shadow: palette.black,
};
