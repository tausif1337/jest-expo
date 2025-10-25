import { add, subtract, multiply, divide } from '../math';

test('addtion of two numbers',() => {
    expect(add(1, 2)).toBe(3);
});

test('subtraction of two numbers',() => {
    expect(subtract(1, 2)).toBe(-1);
});

test('multiplication of two numbers',() => {
    expect(multiply(1, 2)).toBe(2);
});

test('division of two numbers',() => {
    expect(divide(1, 2)).toBe(0.5);
});