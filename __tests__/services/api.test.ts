import {FakeProductApi, Product} from '../../src/services/api';
import Storage from '../../src/services/storage';

jest.mock('../../src/services/storage');
const mockedStorage = Storage as jest.Mocked<typeof Storage>;

describe('FakeProductApi', () => {
  let fakeProductApi: FakeProductApi;

  beforeEach(() => {
    jest.resetAllMocks();
    fakeProductApi = new FakeProductApi([]);
  });

  describe('getProducts', () => {
    it('should return an empty array when there are no products', async () => {
      mockedStorage.getAll.mockResolvedValue([]);

      const products = await fakeProductApi.getProducts();
      expect(products).toEqual([]);
    });

    it('should return an array of products when there are products', async () => {
      const product1 = new Product(1, 'Product 1', 10, 5);
      const product2 = new Product(2, 'Product 2', 20, 3);
      mockedStorage.getAll.mockResolvedValue([product1, product2]);

      fakeProductApi = new FakeProductApi([product1, product2]);

      const products = await fakeProductApi.getProducts();
      expect(products).toEqual([product1, product2]);
    });
  });

  describe('createProduct', () => {
    it('should create a new product and return it', async () => {
      const product = await fakeProductApi.createProduct(
        [],
        'New Product',
        15,
        2,
      );
      expect(product.id).toBe(1);
      expect(product.name).toBe('New Product');
      expect(product.price).toBe(15);
      expect(product.quantity).toBe(2);
    });
  });

  describe('addQuantity', () => {
    it('should add quantity to the product and return it', async () => {
      const product = new Product(1, 'Product 1', 10, 5);
      fakeProductApi = new FakeProductApi([product]);

      const updatedProduct = await fakeProductApi.addQuantity(1);
      expect(updatedProduct?.quantity).toBe(6);
    });

    it('should return undefined if the product does not exist', async () => {
      const updatedProduct = await fakeProductApi.addQuantity(1);
      expect(updatedProduct).toBeUndefined();
    });
  });

  describe('removeQuantity', () => {
    it('should remove quantity from the product and return it', async () => {
      const product = new Product(1, 'Product 1', 10, 5);
      fakeProductApi = new FakeProductApi([product]);

      const updatedProduct = await fakeProductApi.removeQuantity(1);
      expect(updatedProduct?.quantity).toBe(4);
    });

    it('should return undefined if the product does not exist', async () => {
      const updatedProduct = await fakeProductApi.removeQuantity(1);
      expect(updatedProduct).toBeUndefined();
    });

    it('should remove the product if the quantity is 0', async () => {
      const product = new Product(1, 'Product 1', 10, 1);
      fakeProductApi = new FakeProductApi([product]);

      const updatedProduct = await fakeProductApi.removeQuantity(1);
      expect(updatedProduct).toBeUndefined();
    });
  });

  describe('removeProduct', () => {
    it('should remove the product', async () => {
      const product = new Product(1, 'Product 1', 10, 5);
      fakeProductApi = new FakeProductApi([product]);

      const removedProduct = await fakeProductApi.removeProduct(1);
      expect(removedProduct).toEqual(undefined);
    });

    it('should return undefined if the product does not exist', async () => {
      const removedProduct = await fakeProductApi.removeProduct(1);
      expect(removedProduct).toBeUndefined();
    });
  });
});
