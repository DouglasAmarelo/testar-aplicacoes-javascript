const sum = (number1, number2) => {
  const int1 = parseInt(number1, 10);
  const int2 = parseInt(number2, 10);

  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error('Please check your input');
  }

  return int1 + int2;
};

module.exports = {
  sum,
};
