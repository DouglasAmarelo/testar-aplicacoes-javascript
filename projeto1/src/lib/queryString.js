const keyValueToString = ([key, value]) => {
  const typeOfValue = Object.prototype.toString.call(value);

  if (typeOfValue === '[object Object]') {
    throw new Error('Please check your parameters');
  }

  return `${key}=${value}`;
};

const queryString = obj => {
  const result = Object.entries(obj).map(keyValueToString).join('&');

  return result;
};

const parse = str => {
  const result = Object.fromEntries(
    str.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.includes(',')) {
        value = value.split(',');
      }

      return [key, value];
    })
  );

  return result;
};

export { queryString, parse };
