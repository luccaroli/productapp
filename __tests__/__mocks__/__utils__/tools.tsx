import React, {ReactElement} from 'react';

import {render} from '@testing-library/react-native';
import {WaitForOptions} from '@testing-library/react-native/build/wait-for';
import {ThemeProvider} from 'styled-components/native';
import light from '../../../src/theme/light';

interface IProviders {
  children: React.ReactNode;
}

type TCustomRender = ReturnType<typeof render>;

export const Providers = ({children}: IProviders) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

function customRender(
  ui: ReactElement,
  options?: WaitForOptions,
): TCustomRender {
  return render(ui, {wrapper: Providers, ...options});
}

export {customRender as render};
