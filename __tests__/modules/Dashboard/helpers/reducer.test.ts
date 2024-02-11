import {reducer} from '../../../../src/modules/Dashboard/helpers/reducer';
import {
  ActionTypes,
  InitialStateType,
} from '../../../../src/modules/Dashboard/types';

describe('dashboard reducer', () => {
  const initialState: InitialStateType = {
    products: [],
    type: 'all',
  };
  it('should handle LOAD_PRODUCTS action', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.LOAD_PRODUCTS,
      payload: products,
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.products).toEqual(products);
  });

  it('should handle ADD_PRODUCT action', () => {
    const product = {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      quantity: 1,
      totalPrice: 10.0,
    };

    const action = {
      type: ActionTypes.ADD_PRODUCT,
      payload: product,
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.products).toEqual([product]);
  });

  it('should handle UPDATE_PRODUCT action', () => {
    const state: InitialStateType = {
      type: 'all',
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 10.0,
          quantity: 1,
          totalPrice: 10.0,
        },
        {
          id: 2,
          name: 'Product 2',
          price: 20.0,
          quantity: 1,
          totalPrice: 20.0,
        },
      ],
    };

    const updatedProduct = {
      id: 1,
      name: 'Updated Product 1',
      price: 15.0,
      quantity: 2,
      totalPrice: 30.0,
    };

    const action = {
      type: ActionTypes.UPDATE_PRODUCT,
      payload: updatedProduct,
    } as never;

    const newState = reducer(state, action);

    expect(newState.products).toEqual([updatedProduct, state.products[1]]);
  });

  it('should handle REMOVE_PRODUCT action', () => {
    const state: InitialStateType = {
      type: 'all',
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 10.0,
          quantity: 1,
          totalPrice: 10.0,
        },
        {
          id: 2,
          name: 'Product 2',
          price: 20.0,
          quantity: 1,
          totalPrice: 20.0,
        },
      ],
    };

    const action = {
      type: ActionTypes.REMOVE_PRODUCT,
      payload: {
        id: 1,
      },
    } as never;

    const newState = reducer(state, action);

    expect(newState.products).toEqual([state.products[1]]);
  });

  it('should handle SEARCH_PRODUCT action', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.SEARCH_PRODUCT,
      payload: {
        query: 'Product 1',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.products).toEqual([products[0]]);
  });

  it('should handle filter action, by name', () => {
    const products = [
      {
        id: 1,
        name: 'B Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'A Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.FILTER,
      payload: {
        type: 'name',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.type).toEqual('name');
    expect(newState.products[0].name).toEqual('A Product 2');
  });

  it('should handle filter action, by price', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.FILTER,
      payload: {
        type: 'price',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.type).toEqual('price');
    expect(newState.products[0].price).toEqual(20.0);
  });

  it('should handle filter action, by quantity', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
        quantity: 2,
        totalPrice: 40.0,
      },
    ];

    const action = {
      type: ActionTypes.FILTER,
      payload: {
        type: 'quantity',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.type).toEqual('quantity');
    expect(newState.products[0].quantity).toEqual(2);
  });

  it('should handle filter action, by all', () => {
    const products = [
      {
        id: 1,
        name: 'B Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'A Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.FILTER,
      payload: {
        type: 'all',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.type).toEqual('all');
    expect(newState.products).toEqual(products);
  });

  it('should handle filter action, by unknown type', () => {
    const products = [
      {
        id: 1,
        name: 'B Product 1',
        price: 10.0,
        quantity: 1,
        totalPrice: 10.0,
      },
      {
        id: 2,
        name: 'A Product 2',
        price: 20.0,
        quantity: 1,
        totalPrice: 20.0,
      },
    ];

    const action = {
      type: ActionTypes.FILTER,
      payload: {
        type: 'unknown',
      },
    } as never;

    const newState = reducer(
      {
        ...initialState,
        products,
      },
      action,
    );

    expect(newState.products).toEqual(products);
  });

  it('should handle default action', () => {
    const action = {
      type: 'unknown',
    } as never;

    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
