import {ActionTypes, Actions, InitialStateType} from '../types';

export function reducer(
  state: InitialStateType,
  action: Actions,
): InitialStateType {
  switch (action.type) {
    case ActionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };

    case ActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload.id,
        ),
      };

    case ActionTypes.SEARCH_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product =>
          product.name
            .toLowerCase()
            .includes(action.payload.query.toLowerCase()),
        ),
      };

    case ActionTypes.FILTER:
      if (action.payload.type === 'all') {
        return {
          ...state,
          type: action.payload.type,
        };
      }

      return {
        ...state,
        type: action.payload.type,
        products: state.products.sort((a, b) => {
          if (action.payload.type === 'name') {
            return a.name.localeCompare(b.name);
          }

          if (action.payload.type === 'price') {
            return b.price - a.price;
          }

          if (action.payload.type === 'quantity') {
            return b.quantity - a.quantity;
          }

          return 0;
        }),
      };

    default:
      return state;
  }
}
