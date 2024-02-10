import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import ThemeProvider from './theme/Theme';

function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
