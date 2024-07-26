import { add, subtract } from './path-to-your-file'; // Ensure to replace with the actual path to your file

describe('add', () => {
  test('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(10, 20)).toBe(30);
  });

  test('should add two negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
    expect(add(-10, -20)).toBe(-30);
  });

  test('should add a positive and a negative number', () => {
    expect(add(1, -2)).toBe(-1);
    expect(add(-10, 20)).toBe(10);
  });

  test('should add zero', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });
});

describe('subtract', () => {
  test('should subtract two positive numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(20, 10)).toBe(10);
  });

  test('should subtract two negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
    expect(subtract(-20, -10)).toBe(-10);
  });

  test('should subtract a positive and a negative number', () => {
    expect(subtract(5, -3)).toBe(8);
    expect(subtract(-5, 3)).toBe(-8);
  });

  test('should subtract zero', () => {
    expect(subtract(0, 0)).toBe(0);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(5, 0)).toBe(5);
  });
});