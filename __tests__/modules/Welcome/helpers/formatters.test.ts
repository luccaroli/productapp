import {
  cpfMask,
  validateCPF,
} from '../../../../src/modules/Welcome/helpers/formatters';

describe('validateCPF', () => {
  it('should return true for a valid CPF', () => {
    const validCPF = '12345678909';
    expect(validateCPF(validCPF)).toBe(true);
  });

  it('should return false for an invalid CPF with incorrect digit at position 9', () => {
    const invalidCPF = '12345678999';
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it('should return false for an invalid CPF with incorrect digit at position 10', () => {
    const invalidCPF = '12345678990';
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it('should return false for an invalid CPF with length less than 11', () => {
    const invalidCPF = '123456789';
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it('should return false for an invalid CPF with length greater than 11', () => {
    const invalidCPF = '1234567890987';
    expect(validateCPF(invalidCPF)).toBe(false);
  });

  it('should return false for an invalid CPF with non-numeric characters', () => {
    const invalidCPF = '12A45B78909';
    expect(validateCPF(invalidCPF)).toBe(false);
  });
});

describe('cpfMask', () => {
  it('should format a CPF without any special characters', () => {
    const cpf = '12345678909';
    expect(cpfMask(cpf)).toBe('123.456.789-09');
  });

  it('should format a CPF with extra digits', () => {
    const cpf = '12345678909876';
    expect(cpfMask(cpf)).toBe('123.456.789-09');
  });

  it('should format a CPF with incomplete digits', () => {
    const cpf = '12345';
    expect(cpfMask(cpf)).toBe('123.45');
  });
});
