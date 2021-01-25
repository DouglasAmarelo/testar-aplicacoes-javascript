import find from 'lodash/find';
import remove from 'lodash/remove';
import Money from 'dinero.js';

import { calculateDiscount } from './discount.utils';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

class Cart {
  items = [];

  add(item) {
    this.removeDuplicateProduct(item.product);

    return this.items.push(item);
  }

  removeDuplicateProduct(product) {
    const duplicateProduct = { product };

    if (find(this.items, duplicateProduct)) {
      remove(this.items, duplicateProduct);
    }
  }

  remove(product) {
    remove(this.items, { product });

    return this.items;
  }

  removeAllItems() {
    this.items = [];

    return this.items;
  }

  summary() {
    const items = this.items;
    const total = this.getTotal();
    const formatted = total.toFormat('$0,0.00');

    return {
      total: total.getAmount(),
      formatted,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.removeAllItems();

    return { total, items };
  }

  getTotal() {
    const total = this.items.reduce((totalPrice, item) => {
      const amount = Money({ amount: item.product.price * item.quantity });
      const discount = calculateDiscount(amount, item);
      const result = totalPrice.add(amount).subtract(discount);

      return result;
    }, Money({ amount: 0 }));

    return total;
  }
}

export { Cart };
