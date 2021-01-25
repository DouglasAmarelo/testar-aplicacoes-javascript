import { Cart } from './Cart';

describe('Cart', () => {
  let cart;
  let product;
  let product2;

  beforeEach(() => {
    cart = new Cart();

    product = {
      title: 'Adidas running shoes - men',
      price: 35388, // 353.88 || R$ 353,88
    };

    product2 = {
      title: 'Adidas running shoes - women',
      price: 41872, // 418.71 || R$ 418,72
    };
  });

  describe('getTotal', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2, // 35388 * 2 = 70776
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2, // 35388 * 2 = 70776
      });

      cart.add({
        product,
        quantity: 1, // 35388
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included ans then removed ', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary().formatted).toEqual('R$3,025.56');
    });

    it('should include formatted amount in the summary', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount when quantity above minimun is passed', () => {
      const discountCondition = {
        percentage: 30,
        minimun: 2,
      };

      cart.add({
        product,
        discountCondition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should NOT apply percentage discount when quantity is below minimun', () => {
      const discountCondition = {
        percentage: 30,
        minimun: 2,
      };

      cart.add({
        product,
        discountCondition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should apply quantity discount for even quantities', () => {
      const discountCondition = {
        quantity: 2,
      };

      cart.add({
        product,
        discountCondition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should NOT apply quantity discount for even quantities when condition is not met', () => {
      const discountCondition = {
        quantity: 2,
      };

      cart.add({
        product,
        discountCondition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should apply quantity discount for odd quantities', () => {
      const discountCondition = {
        quantity: 2,
      };

      cart.add({
        product,
        discountCondition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    describe('should receive two or more discount conditions and apply the best discount', () => {
      it('First Case', () => {
        const discountCondition_01 = {
          percentage: 30, // 30%
          minimun: 2,
        };

        const discountCondition_02 = {
          quantity: 2, // 40% || 50%
        };

        cart.add({
          product,
          discountCondition: [discountCondition_01, discountCondition_02],
          quantity: 5,
        });

        expect(cart.getTotal().getAmount()).toEqual(106164); // 40% OFF
      });

      it('Second Case', () => {
        const discountCondition_01 = {
          percentage: 80, // 80%
          minimun: 2,
        };

        const discountCondition_02 = {
          quantity: 2, // 40% || 50%
        };

        cart.add({
          product,
          discountCondition: [discountCondition_01, discountCondition_02],
          quantity: 5,
        });

        expect(cart.getTotal().getAmount()).toEqual(35388); // 40% OFF
      });
    });
  });
});
