import {
  formatPrice,
  formatTotalPrice,
  checkTypeNumber,
  generateId,
} from '../../../../src/modules/Dashboard/helpers/formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      const price = 100;
      const result = formatPrice(price);
      expect(result).toMatch('R$\xa0100,00');
    });
  });

  describe('formatTotalPrice', () => {
    it('should calculate total price correctly', () => {
      const price = 100;
      const quantity = 2;
      const result = formatTotalPrice(price, quantity);
      expect(result).toEqual(200);
    });
  });

  describe('checkTypeNumber', () => {
    it('should return false for number input', () => {
      const inputValue = '123';
      const result = checkTypeNumber(inputValue);
      expect(result).toBe(false);
    });

    it('should return true for non-number input', () => {
      const inputValue = 'abc';
      const result = checkTypeNumber(inputValue);
      expect(result).toBe(true);
    });
  });

  describe('generateId', () => {
    it('should generate a unique id not in the provided list', () => {
      const ids = [1, 2, 3];
      const newId = generateId(ids);
      expect(newId).toBe(4);
    });

    it('should generate a unique id when the list is empty', () => {
      const ids: number[] = [];
      const newId = generateId(ids);
      expect(newId).toBe(1);
    });

    it('should generate an id between existing ids', () => {
      const ids = [1, 3, 4];
      const newId = generateId(ids);
      expect(newId).toBe(2);
    });

    it('should reuse the first id', () => {
      const ids = [3, 4];
      const newId = generateId(ids);
      expect(newId).toBe(1);
    });
  });
});
