import {renderHook, waitFor} from '@testing-library/react-native';
import useProducts from '../../../../src/modules/Dashboard/hooks/useProducts';
import Storage from '../../../../src/services/storage';

jest.mock('../../../../src/services/storage');
const mockStorage = Storage as jest.Mocked<typeof Storage>;

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    mockStorage.getAll.mockResolvedValue([]);
  });

  it('should load products', async () => {
    const products = [
      {
        name: 'Test Product 1',
        price: 10,
        quantity: 5,
        totalPrice: 50,
      },
      {
        name: 'Test Product 2',
        price: 20,
        quantity: 10,
        totalPrice: 200,
      },
    ];

    mockStorage.getAll.mockResolvedValue(products);

    const {result} = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(products);
    });
  });
  it('should add a product', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product',
        price: 10,
        quantity: 5,
      });
    });

    expect(result.current.products.length).toBe(1);
    expect(result.current.products[0].id).toBe(1);
    expect(result.current.products[0].name).toBe('Test Product');
    expect(result.current.products[0].price).toBe(10);
    expect(result.current.products[0].quantity).toBe(5);

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product 2',
        price: 10,
        quantity: 1,
      });
    });

    expect(result.current.products.length).toBe(2);
    expect(result.current.products[1].id).toBe(2);
    expect(result.current.products[1].name).toBe('Test Product 2');
    expect(result.current.products[1].price).toBe(10);
    expect(result.current.products[1].quantity).toBe(1);
  });

  it('should add product quantity', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product',
        price: 10,
        quantity: 5,
      });
    });

    await waitFor(async () => {
      await result.current.addProductQuantity(1);
    });

    expect(result.current.products[0].quantity).toBe(6);
    expect(result.current.products[0].totalPrice).toBe(60);
  });

  it('should remove product quantity', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product',
        price: 10,
        quantity: 5,
      });
    });

    await waitFor(async () => {
      await result.current.removeProductQuantity(1);
    });

    expect(result.current.products[0].quantity).toBe(4);
    expect(result.current.products[0].totalPrice).toBe(40);
  });

  it('should remove product', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product',
        price: 10,
        quantity: 1,
      });
    });

    await waitFor(async () => {
      await result.current.removeProductQuantity(1);
    });

    expect(result.current.products.length).toBe(0);
  });

  it('should search for products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Test Product 1',
        price: 10,
        quantity: 5,
        totalPrice: 50,
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: 20,
        quantity: 10,
        totalPrice: 200,
      },
    ];
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product 1',
        price: 10,
        quantity: 5,
      });
      result.current.addProduct({
        name: 'Test Product 2',
        price: 20,
        quantity: 10,
      });
    });

    await waitFor(async () => {
      await result.current.searchProduct('Product 1');
    });

    expect(result.current.products.length).toBe(1);
    expect(result.current.products[0].name).toBe('Test Product 1');

    mockStorage.getAll.mockResolvedValue(mockProducts);

    await waitFor(async () => {
      await result.current.searchProduct('');
    });

    expect(result.current.products.length).toBe(2);
  });

  it('should filter products', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'B Test Product 1',
        price: 10,
        quantity: 5,
      });
      await result.current.addProduct({
        name: 'A Test Product 2',
        price: 20,
        quantity: 10,
      });
    });

    waitFor(() => {
      result.current.filterProducts('name');
    });

    expect(result.current.products[0].name).toBe('A Test Product 2');
  });

  it('should remove product from list', async () => {
    const {result} = renderHook(() => useProducts());

    await waitFor(async () => {
      await result.current.addProduct({
        name: 'Test Product 1',
        price: 10,
        quantity: 5,
      });
    });

    await waitFor(async () => {
      await result.current.removeProduct(1);
    });

    expect(result.current.products.length).toBe(0);
  });
});
