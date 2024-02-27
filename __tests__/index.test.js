import shoppingCart from '../src/index.js';

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
      total: 0,
      discounted: false
    }
  );
});