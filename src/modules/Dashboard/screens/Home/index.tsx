import React, {useCallback} from 'react';
import Form from '../../components/Form';
import Header from '../../components/Header';
import {Container} from './styles';
import Product from '../../components/Product';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import useProducts from '../../hooks/useProducts';
import {SafeAreaView} from '../../../../components/SafeAreaView';
import {IProductProps} from '../../types';
import Filter from '../../components/Filter';

function Home() {
  const {
    products,
    addProductQuantity,
    removeProductQuantity,
    addProduct,
    searchProduct,
    filterProducts,
    type,
    removeProduct,
  } = useProducts();

  const ListHeaderComponent = useCallback(() => {
    return (
      <View>
        <Header onSearch={searchProduct} />
        <Form onSubmit={addProduct} />
        <Filter selected={type} setSelected={filterProducts} />
      </View>
    );
  }, [addProduct, filterProducts, searchProduct, type]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IProductProps>) => (
      <Product
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        totalPrice={item.totalPrice}
        onAdd={() => addProductQuantity(item.id)}
        onRemove={() => removeProductQuantity(item.id)}
        onDelete={() => removeProduct(item.id)}
      />
    ),
    [addProductQuantity, removeProduct, removeProductQuantity],
  );

  return (
    <SafeAreaView>
      <Container>
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          data={products}
          keyboardShouldPersistTaps="handled"
          renderItem={renderItem}
        />
      </Container>
    </SafeAreaView>
  );
}

export default Home;
