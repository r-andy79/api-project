const { test, expect } = require('@jest/globals');
const buildQuery = require('./script/script');

test('abv_gt, 5 to equal abv_gt=5', () => {
  expect(buildQuery({abv_gt: 5})).toBe('abv_gt=5');
})

test('{abv_gt: 5, ibu: 10} to equal abv_gt=5&ibu=10', () => {
  expect(buildQuery({abv_gt: 5, ibu: 10})).toBe('abv_gt=5&ibu=10')
})

test('empty object to return empty string', () => {
  expect(buildQuery({})).toBe('');
})

test('passing object with empty value returns a string with no value', () => {
  expect(buildQuery({abv_gt: 5, ibu: ""})).toBe('abv_gt=5&ibu=');
})