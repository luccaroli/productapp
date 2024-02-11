import React, {useState} from 'react';

import {Container, SearchInput} from './styles';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  onSearch: (query: string) => void;
}

function Header({onSearch}: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  return (
    <Container>
      <SearchInput
        placeholder="Pesquise..."
        value={search}
        onChangeText={setSearch}
        onEndEditing={() => onSearch(search)}
        returnKeyType="search"
      />
      <Button title="Menu" onPress={() => navigation.navigate('Menu')} />
    </Container>
  );
}

export default Header;
