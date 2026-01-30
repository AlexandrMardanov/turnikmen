import { Input } from '@/components/shared/Input';

type SignUpInputsProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
};

export function SignUpInputs(props: SignUpInputsProps) {
  const {
    name,
    email,
    password,
    confirmPassword,
    loading,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
  } = props;

  return (
    <>
      <Input
        placeholder="Ваше ім'я"
        value={name}
        onChangeText={onNameChange}
        autoCapitalize='words'
        editable={!loading}
      />
      <Input
        placeholder='Електронна пошта'
        value={email}
        onChangeText={onEmailChange}
        autoCapitalize='none'
        keyboardType='email-address'
        editable={!loading}
      />
      <Input
        placeholder='Пароль'
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        editable={!loading}
      />
      <Input
        placeholder='Підтвердіть пароль'
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        secureTextEntry
        editable={!loading}
      />
    </>
  );
}
