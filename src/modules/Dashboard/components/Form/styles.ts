import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface InputProps extends TextInputProps {
  error?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const InputProduct = styled.TextInput.attrs<InputProps>(props => ({
  placeholderTextColor: props.theme.colors.text,
}))`
  border-width: 1px;
  border-radius: 4px;
  border-color: ${props =>
    props.error ? props.theme.colors.error : props.theme.colors.secondary};
  width: 49%;
  padding: 10px;
  color: ${props => props.theme.colors.text};
`;
