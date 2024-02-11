import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  width: 100%;
`;

export const ProductContent = styled.View`
  width: 100%;
  height: 110px;
  padding: 10px;
  border-radius: 4px;
  margin: 8px 0px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.secondary};
`;

export const Label = styled.Text<{bold?: boolean}>`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;

export const ActionsContainer = styled.View`
  max-height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  align-items: center;
  padding: 4px;
  width: 70px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 4px;
`;
