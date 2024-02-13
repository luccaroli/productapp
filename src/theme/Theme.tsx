import React, {createContext, useState} from 'react';
import {ThemeProvider as ThemeProviderDefault} from 'styled-components/native';
import dark from './dark';
import light from './light';
import {StatusBar} from 'react-native';

interface ThemeContextProps {
  theme: ThemeType;
  onToggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

const themes = {
  dark: dark,
  light: light,
};

function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState(ThemeType.LIGHT);

  function onToggleTheme() {
    setTheme(oldTheme =>
      oldTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT,
    );
  }

  return (
    <ThemeContext.Provider value={{theme: theme, onToggleTheme}}>
      <ThemeProviderDefault theme={themes[theme]}>
        <StatusBar
          barStyle={theme === ThemeType.DARK ? 'light-content' : 'dark-content'}
        />
        {children}
      </ThemeProviderDefault>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
