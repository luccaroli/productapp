import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ThemeProvider, {ThemeContext, ThemeType} from '../../src/theme/Theme';
import {Button} from 'react-native';

describe('ThemeProvider', () => {
  it('should toggle the theme when onToggleTheme is called', () => {
    const TestComponent = () => {
      const {theme, onToggleTheme} = React.useContext(ThemeContext);
      return (
        <Button
          title={theme === ThemeType.LIGHT ? 'light' : 'dark'}
          onPress={onToggleTheme}
        />
      );
    };

    const {getByText} = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = getByText('light');
    fireEvent.press(toggleButton);

    expect(getByText('dark')).toBeDefined();

    fireEvent.press(toggleButton);
    expect(getByText('light')).toBeDefined();
  });
});
