import { item1, item2, item3 } from './items.js';
import codes from './codes.js';

export default class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.discounted = false;
    this.discountCode = null;
  }

  addItem(item, quantity = 1) {
    this.items.push({ item, quantity });
    this.calculateTotal();
  }

  removeItem(name) {
    this.items = this.items.filter((elem) => elem.item.name !== name);
    this.calculateTotal();
  }

  updateQuantity(name, quantity) {
    const foundItem = this.items.find(({ item }) => item.name === name);

    if (foundItem) {
        foundItem.quantity = quantity;
        this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, elem) => acc + elem.item.price * elem.quantity, 0);
  }


  clearCart() {
    this.items = [];
    this.total = 0;
  }

  applyDiscount(codeName) {
    const code = codes.find(code => code.name === codeName);
    const currentDate = new Date();

    if (code && new Date(code.expireDate) > currentDate) {
        this.total *= (100 - code.percentage) / 100;
        this.discounted = true;
        this.discountCode = codeName;
    } else {
        this.discounted = false;
        this.discountCode = null;
    }
  }
}

const myCart = new ShoppingCart();
myCart.addItem(item1, 2);
myCart.addItem(item2);
console.log(myCart);
myCart.removeItem(item1.name);
console.log(myCart);
myCart.addItem(item1, 2);
myCart.addItem(item3, 3);
myCart.updateQuantity(item1.name, 4);
console.log(myCart);
myCart.applyDiscount('validCode');
console.log(myCart);
myCart.clearCart();
console.log(myCart);
