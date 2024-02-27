'use strict'

import { item1, item2, item3 } from '../src/items.js';

export default class shoppingCart {
  constructor(){
    this.items = [];
    this.total = 0;
    this.discounted = false;
  }
  addItem(item, quantity = 1) {
    this.items.push({ item: item, quantity: quantity });
  }
  removeItem() {}
  updateQuantity() {}
  calculateTotal() {}
  clearCart() {}
  applyDiscount() {}
}


let myCart = new shoppingCart();
myCart.addItem(item1);
console.log(myCart);
