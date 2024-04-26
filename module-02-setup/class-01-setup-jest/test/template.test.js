import { it, expect } from '@jest/globals';

function add(a, b) {
  return a + b;
}

it('should add two numbers', () => {
  expect(add(1, 2)).toBe(3);
})
