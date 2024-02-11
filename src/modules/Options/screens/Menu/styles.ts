import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`;

export const OptionsContainer = styled.View`
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Row = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const BackButton = styled.Pressable``;
