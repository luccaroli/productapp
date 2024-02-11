import React, {useState} from 'react';
import {Container, InputProduct, Row, Title} from './styles';
import {Button} from 'react-native';
import {ProductSubmitType} from '../../types';
import {checkTypeNumber} from '../../helpers/formatters';

interface FormProps {
  onSubmit: (product: ProductSubmitType) => void;
}

function Form({onSubmit}: FormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const disabledButton =
    !name ||
    !quantity ||
    !price ||
    checkTypeNumber(price) ||
    checkTypeNumber(quantity);

  return (
    <Container>
      <Title>Cadastre seu produto</Title>
      <Row>
        <InputProduct
          placeholder="Nome"
          inputMode="text"
          value={name}
          onChangeText={setName}
        />
        <InputProduct
          placeholder="Quantidade"
          inputMode="numeric"
          value={quantity}
          onChangeText={setQuantity}
          error={checkTypeNumber(quantity)}
        />
      </Row>
      <Row>
        <InputProduct
          placeholder="Valor"
          inputMode="decimal"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={value => setPrice(value)}
          error={checkTypeNumber(price)}
        />
      </Row>
      <Button
        title="Cadastrar"
        disabled={disabledButton}
        onPress={() =>
          onSubmit({name, quantity: Number(quantity), price: Number(price)})
        }
      />
    </Container>
  );
}

export default Form;
