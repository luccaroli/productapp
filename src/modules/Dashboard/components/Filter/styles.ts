import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const FilterItem = styled.TouchableOpacity<{selected: boolean}>`
  padding: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.secondary};
  background-color: ${props =>
    props.selected
      ? props.theme.colors.secondary
      : props.theme.colors.background};
`;

export const FilterItemText = styled.Text`
  color: ${props => props.theme.colors.text};
`;
