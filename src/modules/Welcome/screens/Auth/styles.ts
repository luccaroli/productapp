import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  margin-bottom: 20px;
`;
