import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
`;

export const SearchInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.text,
}))`
  border-width: 1px;
  border-radius: 4px;
  border-color: ${props => props.theme.colors.secondary};
  width: 80%;
  padding: 10px;
  color: ${props => props.theme.colors.text};
`;
