import React from 'react';
import {Container, KeyboardAvoidingView, Title} from './styles';
import {Button, Keyboard, Platform} from 'react-native';
import Input from '../../components/Input';
import {useAuth} from '../../hooks/useAuth';
import {cpfMask} from '../../helpers/formatters';

function Auth() {
  const {setInputCPF, setInputPassword, cpf, password, error, submit} =
    useAuth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container onPress={Keyboard.dismiss}>
        <Title>Entre ou Cadastre-se</Title>
        <Input
          placeholder="CPF"
          keyboardType="numeric"
          value={cpfMask(cpf)}
          maxLength={14}
          onChangeText={setInputCPF}
          error={error?.cpf}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setInputPassword}
          secureTextEntry
          error={error?.password}
        />
        <Button title="Entrar" onPress={submit} disabled={!cpf || !password} />
      </Container>
    </KeyboardAvoidingView>
  );
}

export default Auth;
