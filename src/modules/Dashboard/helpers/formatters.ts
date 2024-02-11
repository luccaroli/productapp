export function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatTotalPrice(price: number, quantity: number) {
  const value = (Math.round(price * 100) * quantity) / 100;
  return value;
}

export function checkTypeNumber(inputValue: string) {
  const numericValue = parseFloat(inputValue);

  return isNaN(numericValue) && inputValue !== '';
}

export function generateId(ids: number[]) {
  let id = [];

  for (let i = Math.min(...ids) + 1; i < Math.max(...ids); i++) {
    if (!ids.includes(i)) {
      id.push(i);
      break;
    }
  }

  if (ids.length && !ids.includes(1)) {
    return 1;
  }

  return id[0] || ids.length + 1;
}
