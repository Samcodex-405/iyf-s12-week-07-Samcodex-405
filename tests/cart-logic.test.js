import { describe, it, expect } from 'vitest';
import {
    addToCart,
    formatPrice,
    getCartCount,
    getCartTotal,
    normalizeCart,
    removeFromCart,
    updateQuantity,
} from '../cart/js/cart-logic.js';

const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
];

describe('addToCart', () => {
    it('adds a new product with quantity 1', () => {
        expect(addToCart([], 1)).toEqual([{ productId: 1, quantity: 1 }]);
    });

    it('increases quantity when the product is already in the cart', () => {
        const cart = [{ productId: 1, quantity: 1 }];
        expect(addToCart(cart, 1)).toEqual([{ productId: 1, quantity: 2 }]);
    });

    it('does not change the original cart', () => {
        const cart = [{ productId: 1, quantity: 1 }];
        addToCart(cart, 1);
        expect(cart).toEqual([{ productId: 1, quantity: 1 }]);
    });
});

describe('updateQuantity and removeFromCart', () => {
    const cart = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
    ];

    it('sets a new quantity', () => {
        expect(updateQuantity(cart, 1, 5)[0].quantity).toBe(5);
    });

    it('removes the item when quantity reaches 0 (edge case)', () => {
        expect(updateQuantity(cart, 1, 0).map((i) => i.productId)).toEqual([2]);
    });

    it('ignores invalid quantities', () => {
        expect(updateQuantity(cart, 1, 'abc')).toEqual(cart);
    });

    it('removes an item', () => {
        expect(removeFromCart(cart, 2).map((i) => i.productId)).toEqual([1]);
    });
});

describe('totals', () => {
    const cart = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
    ];

    it('calculates the cart total', () => {
        expect(getCartTotal(cart, products)).toBe(2397);
    });

    it('counts all items', () => {
        expect(getCartCount(cart)).toBe(3);
    });

    it('returns 0 for an empty cart', () => {
        expect(getCartTotal([], products)).toBe(0);
        expect(getCartCount([])).toBe(0);
    });

    it('formats prices with two decimals', () => {
        expect(formatPrice(5)).toBe('$5.00');
    });
});

describe('normalizeCart', () => {
    it('returns an empty cart for broken data', () => {
        expect(normalizeCart(null, products)).toEqual([]);
        expect(normalizeCart('nope', products)).toEqual([]);
    });

    it('drops invalid items and unknown products', () => {
        const messy = [
            { productId: 1, quantity: 2 },
            { productId: 99, quantity: 1 },
            { productId: 2, quantity: -3 },
            null,
        ];
        expect(normalizeCart(messy, products)).toEqual([
            { productId: 1, quantity: 2 },
        ]);
    });
});
