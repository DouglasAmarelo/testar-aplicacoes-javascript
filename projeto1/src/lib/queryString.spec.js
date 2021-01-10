const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const qs = 'name=Douglas&profession=Developer';
    const obj = {
      name: 'Douglas',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe(qs);
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const qs = 'name=Douglas&abilities=JS,TS';
    const obj = {
      name: 'Douglas',
      abilities: ['JS', 'TS'],
    };

    expect(queryString(obj)).toBe(qs);
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Douglas',
      abilities: { first: 'JS', second: 'TS' },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to an object', () => {
    const qs = 'name=Douglas&profession=Developer';
    const obj = {
      name: 'Douglas',
      profession: 'Developer',
    };

    expect(parse(qs)).toEqual(obj);
  });

  it('should convert a query string of a single key-value object', () => {
    const qs = 'name=Douglas';
    const obj = {
      name: 'Douglas',
    };

    expect(parse(qs)).toEqual(obj);
  });

  it('should convert a query string to an object taking care of comma separator value', () => {
    const qs = 'name=Douglas&abilities=JS,TS';
    const obj = {
      name: 'Douglas',
      abilities: ['JS', 'TS'],
    };

    expect(parse(qs)).toEqual(obj);
  });
});
