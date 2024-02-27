import shoppingCart from '../src/index.js';
import { item1, item2, item3 } from '../src/items.js';

let testCart = new shoppingCart();
const testItem = { article: 0, name: 'testName', price: 99.99, currency: 'usd' };

beforeEach(() => {
  testCart = new shoppingCart();
});

test('Test addItem method', () => {
testCart.addItem(testItem);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: testItem,
          quantity: 1
        }
      ],
      total: 99.99,
      discounted: false,
      discountCode: null
    }
  );
  testCart.addItem(item1);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: testItem,
          quantity: 1
        },
        {
          item: item1,
          quantity: 1
        }
      ],
      total: 548.99,
      discounted: false,
      discountCode: null
    }
  );
});

test('Test removeItem method', () => {
  testCart.addItem(testItem);
  testCart.addItem(item1);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: testItem,
          quantity: 1
        },
        {
          item: item1,
          quantity: 1
        }
      ],
      total: 548.99,
      discounted: false,
      discountCode: null
    }
  );
  testCart.removeItem(testItem.name);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: item1,
          quantity: 1
        }
      ],
      total: 449,
      discounted: false,
      discountCode: null
    }
  );
});

test('Test updateItem method', () => {
  testCart.addItem(testItem);
  testCart.addItem(item3);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: testItem,
          quantity: 1
        },
        {
          item: item3,
          quantity: 1
        }
      ],
      total: 898.99,
      discounted: false,
      discountCode: null
    }
  );
  testCart.updateQuantity(item3.name, 3);
  expect(testCart).toEqual(
    {
      items: [
        {
          item: testItem,
          quantity: 1
        },
        {
          item: item3,
          quantity: 3
        }
      ],
      total: 2496.99,
      discounted: false,
      discountCode: null
    }
  );
});

test('Test clearCart method', () => {
  testCart.addItem(item2, 2);
    expect(testCart).toEqual(
      {
        items: [
          {
            item: item2,
            quantity: 2
          }
        ],
        total: 4798,
        discounted: false,
        discountCode: null
      }
    );
    testCart.clearCart();
    expect(testCart).toEqual(
      {
        items: [],
        total: 0,
        discounted: false,
        discountCode: null
      }
    );
  });

test('Test applyDiscount method', () => {
  testCart.addItem(item2, 2);
    expect(testCart).toEqual(
      {
        items: [
          {
            item: item2,
            quantity: 2
          }
        ],
        total: 4798,
        discounted: false,
        discountCode: null
      }
    );
    testCart.applyDiscount('validCode');
    expect(testCart).toEqual(
      {
        items: [
          {
            item: item2,
            quantity: 2
          }
        ],
        total: 3598.5,
        discounted: true,
        discountCode: 'validCode'
      }
    );
  });

test('Test applyDiscount method negative test', () => {
  testCart.addItem(item2, 2);
    expect(testCart).toEqual(
      {
        items: [
          {
            item: item2,
            quantity: 2
          }
        ],
        total: 4798,
        discounted: false,
        discountCode: null
      }
    );
    testCart.applyDiscount('invalidCode');
    expect(testCart).toEqual(
      {
        items: [
          {
            item: item2,
            quantity: 2
          }
        ],
        total: 4798,
        discounted: false,
        discountCode: null
      }
    );
  });
  