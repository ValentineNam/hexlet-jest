'use strict'

import { item1, item2, item3 } from '../src/items.js';
import { codes } from '../src/codes.js';

export default class shoppingCart {
  constructor(){
    this.items = [];
    this.total = 0;
    this.discounted = false;
    this.discountCode = null;
  }
  
  addItem(item, quantity = 1) {
    this.items.push({ item: item, quantity: quantity });
    this.calculateTotal();
  }

  removeItem(name) {
    this.items = this.items.filter(elem => elem.item.name !== name);
    this.calculateTotal();
  }
  
  updateQuantity(name, quantity) {
    for (let elem of this.items) {
      if (elem.item.name === name) {
        elem.quantity = quantity;
        break;
      }
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let updatedTotal = 0;
    this.items.forEach((elem) => {
       updatedTotal += elem.item.price * elem.quantity;
    });
    this.total = updatedTotal;
  }

  clearCart() {
    this.items = [];
    this.total = 0;
  }

  applyDiscount(codeName) {
    const getCodeDate = (codeName) => {
      const code = codes.find(elem => elem.name === codeName);
      return code ? code.expireDate : -1;
    }
    const getDiscountPercentage = (codeName) => {
      const discountCode = codes.find(code => code.name === codeName);
      if (discountCode) {
          return discountCode.percentage;
      }
    }  
    const currentDate = new Date();
    const codeDate = new Date(getCodeDate(codeName));
    if (currentDate < codeDate) {
      const discountPercent = getDiscountPercentage(codeName);
      this.total *= (100 - discountPercent) / 100;
      this.discounted = true;
      this.discountCode = codeName;
    } else {
      this.discounted = false;
      this.discountCode = null;
    }
  }
}


let myCart = new shoppingCart();
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
