import Money from 'dinero.js';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  const { percentage, minimun } = item.discountCondition;
  const hasDiscount = percentage && item.quantity >= minimun;
  const discount = amount.percentage(hasDiscount ? percentage : 0);

  return discount;
};

const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0;
  const quantityCondition = item?.discountCondition?.quantity;
  const hasDiscount = quantityCondition && item.quantity >= quantityCondition;
  const discountValue = isEven ? 50 : 40;
  const discount = amount.percentage(hasDiscount ? discountValue : 0);

  return discount;
};

const calculateDiscount = (amount, item) => {
  if (!item?.discountCondition) {
    return Money({ amount: 0 });
  }

  const discountConditions = Array.isArray(item.discountCondition)
    ? item.discountCondition
    : [item.discountCondition];

  const discounts = discountConditions.map(condition => {
    let calculate = Money({ amount: 0 });

    if (condition?.percentage) {
      calculate = calculatePercentageDiscount;
    }

    if (condition?.quantity) {
      calculate = calculateQuantityDiscount;
    }

    return calculate(amount, {
      discountCondition: condition,
      quantity: item.quantity,
    }).getAmount();
  });

  const [higherDiscount] = discounts.sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};

export {
  calculatePercentageDiscount,
  calculateQuantityDiscount,
  calculateDiscount,
};
