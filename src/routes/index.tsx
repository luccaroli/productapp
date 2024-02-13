import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../modules/Welcome/screens/Auth';
import Home from '../modules/Dashboard/screens/Home';
import Menu from '../modules/Options/screens/Menu';

const AuthStack = createNativeStackNavigator();

function Routes() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Menu" component={Menu} />
    </AuthStack.Navigator>
  );
}

export default Routes;
