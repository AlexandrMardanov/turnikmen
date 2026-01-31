import { StyleSheet, View, ViewProps } from 'react-native';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
}

export function ScreenContainer(props: ScreenContainerProps) {
  const { children, style, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
