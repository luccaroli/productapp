import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../modules/Welcome/screens/Auth';
import Home from '../modules/Dashboard/screens/Home';

const AuthStack = createNativeStackNavigator();

function Routes() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
}

export default Routes;
