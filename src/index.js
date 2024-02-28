import { item1, item2, item3 } from './items.js';
import codes from './codes.js';

export default class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.discounted = false;
    this.discountCode = null;
  }

// Метод добавления товара в корзину, по умолчанию количество, идущее 2м аргументом = 1
  addItem(item, quantity = 1) {
    const existingItem = this.items.find(i => i.item === item);
// Это проверка на то, находится ли уже товар в корзине и если да, то увеличиваем его кол-во на quntity
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
// Иначе добавляем в массив элементов корзины
        this.items.push({ item, quantity });
    }
// Пересчитываем сумму
    this.calculateTotal();
  }

// Метод удаления товара из корзины
  removeItem(name) {
    this.items = this.items.filter((elem) => elem.item.name !== name);
// Пересчитываем сумму
    this.calculateTotal();
  }

// Обновление кличества товара с определенным именем, исходя из quantity
  updateQuantity(name, quantity) {
    const foundItem = this.items.find(({ item }) => item.name === name);

    if (foundItem) {
      foundItem.quantity = quantity;
// Пересчитываем сумму
      this.calculateTotal();
    }
  }

// Расчет общей суммы, исходя из позиций в корзине (вызывается в большинстве методов)
  calculateTotal() {
    this.total = this.items.reduce((acc, elem) => acc + elem.item.price * elem.quantity, 0);
// Фикс кейса, когда код добавлен перед тем, как были добавлены еще товары
    this.applyDiscount(this.discountCode);
  }

// Метод очистки корзины (введенный скидочны код при этом не сбрасывается)
  clearCart() {
    this.items = [];
    this.total = 0;
  }

// Метод добавления скидки по коду, проверяет валиден ли он на текущий день
  applyDiscount(codeName) {
    const codeObj = codes.find((code) => code.name === codeName);
    const currentDate = new Date();
// Если код валидный (существует или не просрочен), то пересчитываем цену
    if (codeObj && new Date(codeObj.expireDate) > currentDate) {
      this.total *= (100 - codeObj.percentage) / 100;
      this.discounted = true;
      this.discountCode = codeName;
// Иначе сбрасываем код (в тч, если уже какой-то указан)
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
myCart.applyDiscount('invalidCode');
console.log(myCart);
myCart.clearCart();
console.log(myCart);
