import shoppingCart from '../src/index.js';
import { item1, item2, item3 } from '../src/items.js';

let testCart = new shoppingCart();

beforeEach(() => {
  testCart = new shoppingCart();
});

test('Test addItem method', () => {
testCart.addItem({ article: 0, name: 'testName', price: 99.99, currency: 'usd' });
  expect(testCart).toEqual(
    {
      items: [
        {
          item: { article: 0, name: 'testName', price: 99.99, currency: 'usd' },
          quantity: 1
        }
      ],
      total: 99.99,
      discounted: false
    }
  );
  testCart.addItem(item1);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: { article: 0, name: 'testName', price: 99.99, currency: 'usd' },
          quantity: 1
        },
        {
          item: { article: 1, name: 'iPhoneSE2020', price: 449, currency: 'usd' },
          quantity: 1
        }
      ],
      total: 548.99,
      discounted: false
    }
  );
});