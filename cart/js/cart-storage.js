import { normalizeCart } from './cart-logic.js';

const STORAGE_KEY = 'shopping_cart';

export function loadCart(products) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return normalizeCart(raw ? JSON.parse(raw) : [], products);
    } catch {
        // Broken JSON or blocked storage: start with an empty cart
        return [];
    }
}

export function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.warn('Could not save the cart:', error);
    }
}
