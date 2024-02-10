import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

export interface InputProps extends TextInputProps {
  error?: string;
}

export const InputComponent = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.text,
}))<InputProps>`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props =>
    props.error ? props.theme.colors.error : props.theme.colors.secondary};
  padding: 10px;
  margin: 10px;
  width: 90%;
`;

export const ErrorText = styled.Text`
  color: ${props => props.theme.colors.error};
  text-align: left;
  width: 90%;
  font-weight: bold;
`;
