import {useEffect, useReducer} from 'react';
import {
  ActionTypes,
  FilterTypes,
  InitialStateType,
  ProductSubmitType,
} from '../types';
import {reducer} from '../helpers/reducer';
import {FakeProductApi} from '../../../services/api';

const initialState: InitialStateType = {
  products: [],
  type: 'all',
};

function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      const fakeProductApi = new FakeProductApi(initialState.products);
      const products = await fakeProductApi.getProducts();
      dispatch({type: ActionTypes.LOAD_PRODUCTS, payload: products});
    };

    load();
  }, []);

  async function addProduct(product: ProductSubmitType) {
    const ids = state.products.map(p => p.id);
    const fakeProductApi = new FakeProductApi(state.products);
    const newProduct = await fakeProductApi.createProduct(
      ids,
      product.name,
      product.price,
      product.quantity,
    );

    dispatch({type: ActionTypes.ADD_PRODUCT, payload: newProduct});
  }

  async function addProductQuantity(id: number) {
    const fakeProductApi = new FakeProductApi(state.products);
    const product = await fakeProductApi.addQuantity(id);

    if (product) {
      dispatch({type: ActionTypes.UPDATE_PRODUCT, payload: product});
    }
  }

  async function removeProductQuantity(id: number) {
    const fakeProductApi = new FakeProductApi(state.products);
    const product = await fakeProductApi.removeQuantity(id);

    if (product) {
      dispatch({type: ActionTypes.UPDATE_PRODUCT, payload: product});
      return;
    }

    dispatch({type: ActionTypes.REMOVE_PRODUCT, payload: {id}});
  }

  async function searchProduct(query: string) {
    const fakeProductApi = new FakeProductApi(state.products);
    dispatch({type: ActionTypes.SEARCH_PRODUCT, payload: {query}});

    if (!query) {
      const reloadProducts = await fakeProductApi.getProducts();
      dispatch({type: ActionTypes.LOAD_PRODUCTS, payload: reloadProducts});
    }
  }

  function filterProducts(type: FilterTypes) {
    dispatch({type: ActionTypes.FILTER, payload: {type}});
  }

  async function removeProduct(id: number) {
    const fakeProductApi = new FakeProductApi(state.products);
    await fakeProductApi.removeProduct(id);
    dispatch({type: ActionTypes.REMOVE_PRODUCT, payload: {id}});
  }

  return {
    products: state.products,
    type: state.type,
    addProduct,
    addProductQuantity,
    removeProductQuantity,
    searchProduct,
    filterProducts,
    removeProduct,
  };
}

export default useProducts;
