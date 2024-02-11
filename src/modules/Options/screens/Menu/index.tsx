import React, {useContext} from 'react';
import {
  BackButton,
  Container,
  OptionsContainer,
  Row,
  Subtitle,
  Title,
} from './styles';
import {Switch, View} from 'react-native';
import {ThemeContext} from '../../../../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from '../../../../components/SafeAreaView';

const Menu = () => {
  const navigation = useNavigation();
  const {theme, onToggleTheme} = useContext(ThemeContext);

  const value = theme === 'dark';

  return (
    <SafeAreaView>
      <Container>
        <Row>
          <BackButton onPress={navigation.goBack}>
            <Subtitle>{'<'} </Subtitle>
          </BackButton>
          <Title>Configurações</Title>
          <View />
        </Row>
        <OptionsContainer>
          <Subtitle>Dark Mode</Subtitle>
          <Switch value={value} onValueChange={onToggleTheme} />
        </OptionsContainer>
      </Container>
    </SafeAreaView>
  );
};

export default Menu;
