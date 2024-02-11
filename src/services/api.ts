import {
  formatTotalPrice,
  generateId,
} from '../modules/Dashboard/helpers/formatters';
import Storage from './storage';

export class Product {
  public id: number;
  public name: string;
  public price: number;
  public quantity: number;
  public totalPrice: number;

  constructor(id: number, name: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.totalPrice = formatTotalPrice(this.price, this.quantity);
  }
}

export class FakeProductApi {
  private products: Product[] = [];

  constructor(currentState: Product[]) {
    this.products = currentState;
  }

  public async getProducts(): Promise<Product[]> {
    const productKey = 'product:';
    const products = await Storage.getAll<Product>(productKey);
    this.products = products;
    return Promise.resolve(this.products);
  }

  public async createProduct(
    ids: number[],
    name: string,
    price: number,
    quantity: number,
  ): Promise<Product> {
    const id = generateId(ids);
    const newProduct = new Product(id, name, price, quantity);
    await Storage.set(`product:${newProduct.id}`, newProduct);

    return Promise.resolve(newProduct);
  }

  public async addQuantity(productId: number): Promise<Product | undefined> {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      this.products[index].quantity++;
      this.products[index].totalPrice = formatTotalPrice(
        this.products[index].price,
        this.products[index].quantity,
      );

      await Storage.updateItem(`product:${productId}`, this.products[index]);

      return Promise.resolve(this.products[index]);
    }

    return Promise.resolve(undefined);
  }

  public async removeQuantity(productId: number): Promise<Product | undefined> {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      this.products[index].quantity--;
      this.products[index].totalPrice = formatTotalPrice(
        this.products[index].price,
        this.products[index].quantity,
      );

      if (this.products[index].quantity < 1) {
        await Storage.remove(`product:${productId}`);
        this.products = this.products.filter(p => p.id !== productId);
        return Promise.resolve(undefined);
      }

      await Storage.updateItem(`product:${productId}`, this.products[index]);

      return Promise.resolve(this.products[index]);
    }

    return Promise.resolve(undefined);
  }

  public async removeProduct(productId: number): Promise<void> {
    await Storage.remove(`product:${productId}`);
    this.products = this.products.filter(p => p.id !== productId);
  }
}
