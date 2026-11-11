import { describe, it, expect } from 'vitest';
import {
    applyDiscount,
    calculateOrderTotal,
    calculateSubtotal,
} from '../daily-challenges/day-4-refactor/order-total.js';

const order = [
    { name: 'Book', price: 15, quantity: 2 },
    { name: 'Pen', price: 3, quantity: 5 },
    { name: 'Notebook', price: 8, quantity: 3 },
];

describe('calculateSubtotal', () => {
    it('adds up price x quantity (the exercise expects 69)', () => {
        expect(calculateSubtotal(order)).toBe(69);
    });

    it('returns 0 for an empty order', () => {
        expect(calculateSubtotal([])).toBe(0);
    });

    it('throws for input that is not an array', () => {
        expect(() => calculateSubtotal(null)).toThrow(TypeError);
    });

    it('throws for an invalid item', () => {
        expect(() => calculateSubtotal([{ price: 5 }])).toThrow('Invalid');
    });
});

describe('applyDiscount and calculateOrderTotal', () => {
    it('gives no discount at or below 100', () => {
        expect(applyDiscount(100)).toBe(100);
        expect(calculateOrderTotal(order)).toBe(69);
    });

    it('gives 10% off above 100', () => {
        expect(applyDiscount(150)).toBe(135);
    });
});
