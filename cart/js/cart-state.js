// Centralized state: products plus the cart. Only the cart is saved.
import { products } from './products.js';
import { loadCart, saveCart } from './cart-storage.js';

let state = {
    products,
    cart: loadCart(products),
};
const listeners = [];

export function getState() {
    return state;
}

export function setState(updates) {
    state = { ...state, ...updates };
    saveCart(state.cart);
    listeners.forEach((listener) => listener(state));
}

export function subscribe(listener) {
    listeners.push(listener);
}
