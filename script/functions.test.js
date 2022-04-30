import { test, expect } from '@jest/globals';
import { buildQuery, buildView, insertData } from './functions.js';

import jsdom from 'jsdom';

beforeAll(() => {
  global.log = console.warn
  console.log = jest.fn();
});

describe('buildQuery based on an object', () => {
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
})




describe('build some hmtl', () => {

  test('check if insertData() inserts data to my article element and returns it properly', () => {

    // 1. some fake data that makes sense in this scenario
    const item = {
      "id": 1,
      "name": "Buzz",
      "tagline": "A Real Bitter Experience.",
      "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
      "abv": 4.5,
      "ibu": 60,
      "food_pairing": [
          "Spicy chicken tikka masala",
          "Grilled chicken quesadilla",
          "Caramel toffee cake"
      ]
    }
    // 2. prepare fake DOM with article element
    const { document } = new jsdom.JSDOM('<article></article>').window
    // 3. get article element from the fake DOM
    const article = document.querySelector('article');
    // 4. call the FUNCTION I'm testing!!!
    const articleModified = insertData(item, article)
    // 5. assert if it worked as expected    
    expect(articleModified.querySelector('.beer-card p span').textContent).toBe('4.5%') // works!
  
  })

  test.todo('check if buildView() builds even more html based on ...stuff') 

})