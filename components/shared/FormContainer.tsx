import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

import { DismissKeyboard } from './DismissKeyboard';

type FormContainerProps = {
  children: React.ReactNode;
  centered?: boolean;
};

export function FormContainer(props: FormContainerProps) {
  const { children, centered = true } = props;

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, !centered && styles.scrollContentTop]}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  scrollContentTop: {
    justifyContent: 'flex-start',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
});
