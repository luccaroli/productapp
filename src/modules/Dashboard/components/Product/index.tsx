import React from 'react';

import {
  ActionsContainer,
  ButtonContainer,
  Container,
  Label,
  ProductContent,
  Separator,
} from './styles';
import {View} from 'react-native';
import {formatPrice} from '../../helpers/formatters';
import {ProductComponentType} from '../../types';

function Product({
  name,
  price,
  quantity,
  totalPrice,
  onAdd,
  onRemove,
  onDelete,
}: ProductComponentType) {
  return (
    <Container>
      <ProductContent>
        <View>
          <Label>
            Nome: <Label bold>{name}</Label>
          </Label>
          <Label>
            Preço: <Label bold>{formatPrice(price)}</Label>
          </Label>
          <Label>
            Quantidade: <Label bold>{quantity} uni</Label>
          </Label>
          <Label>
            Preço total: <Label bold>{formatPrice(totalPrice)}</Label>
          </Label>
        </View>
        <ActionsContainer>
          <ButtonContainer onPress={onAdd}>
            <Label>+</Label>
          </ButtonContainer>
          <Separator />
          <ButtonContainer onPress={onRemove}>
            <Label>-</Label>
          </ButtonContainer>
          <Separator />
          <ButtonContainer onPress={onDelete}>
            <Label>Excluir</Label>
          </ButtonContainer>
        </ActionsContainer>
      </ProductContent>
    </Container>
  );
}

export default Product;
