import { COLORS } from '@/constants/colors';

export const CHART_PADDING = 48;
export const CHART_HEIGHT = 160;

export const CHART_CONFIG = {
  backgroundColor: COLORS.background.primary,
  backgroundGradientFrom: COLORS.background.primary,
  backgroundGradientTo: COLORS.background.primary,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: COLORS.accent.primary,
  },
};
