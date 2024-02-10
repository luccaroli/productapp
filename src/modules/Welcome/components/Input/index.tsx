import React from 'react';
import {ErrorText, InputComponent, InputProps} from './styles';

function Input({error, ...rest}: InputProps) {
  return (
    <>
      <InputComponent error={error} {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}

export default Input;
