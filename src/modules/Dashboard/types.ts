export type IProductProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type InitialStateType = {
  type: FilterTypes;
  products: IProductProps[];
};

export type ProductSubmitType = Pick<
  IProductProps,
  'name' | 'quantity' | 'price'
>;

export type ProductComponentType = Pick<
  IProductProps,
  'name' | 'price' | 'quantity'
> & {
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
  totalPrice: number;
};

export enum ActionTypes {
  LOAD_PRODUCTS = 'LOAD_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  SEARCH_PRODUCT = 'SEARCH_PRODUCT',
  FILTER = 'FILTER',
}

export type FilterTypes = 'all' | 'name' | 'price' | 'quantity';

export type Actions =
  | {
      type: ActionTypes.LOAD_PRODUCTS;
      payload: IProductProps[];
    }
  | {type: ActionTypes.ADD_PRODUCT; payload: IProductProps}
  | {type: ActionTypes.UPDATE_PRODUCT; payload: IProductProps}
  | {type: ActionTypes.REMOVE_PRODUCT; payload: {id: number}}
  | {
      type: ActionTypes.SEARCH_PRODUCT;
      payload: {query: string};
    }
  | {
      type: ActionTypes.FILTER;
      payload: {type: FilterTypes};
    };
