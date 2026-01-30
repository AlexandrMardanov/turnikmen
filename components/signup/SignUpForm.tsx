import { Image, StyleSheet, View } from 'react-native';

import { Button } from '@/components/shared/Button';
import { DismissKeyboard } from '@/components/shared/DismissKeyboard';
import { Title } from '@/components/shared/Title';

import { SignUpFooter } from './components/SignUpFooter';
import { SignUpInputs } from './components/SignUpInputs';
import { useSignUp } from './hooks/useSignUp';

export function SignUpForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSignUp,
  } = useSignUp();

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image source={require('@/assets/icon.png')} style={styles.icon} />
          <Title title='Реєстрація' subtitle='Зареєструйтеся, щоб почати' />
          <SignUpInputs
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            loading={loading}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
          />
          <Button
            title='Зареєструватися'
            onPress={handleSignUp}
            loading={loading}
            disabled={!name || !email || !password || !confirmPassword}
          />
          <SignUpFooter />
        </View>
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
