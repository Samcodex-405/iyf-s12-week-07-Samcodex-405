import { getState, setState, subscribe } from './cart-state.js';
import { elements, render, renderProducts } from './cart-ui.js';
import { addToCart, removeFromCart, updateQuantity } from './cart-logic.js';

// Add to cart (event delegation on the product list)
elements.productList.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-cart');
    if (button) {
        setState({
            cart: addToCart(getState().cart, Number(button.dataset.id)),
        });
    }
});

// Quantity buttons and remove (event delegation on the cart list)
elements.cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) {
        return;
    }
    const { cart } = getState();
    const productId = Number(button.dataset.id);
    const item = cart.find((entry) => entry.productId === productId);
    if (!item) {
        return;
    }

    if (button.dataset.action === 'increase') {
        setState({ cart: updateQuantity(cart, productId, item.quantity + 1) });
    } else if (button.dataset.action === 'decrease') {
        setState({ cart: updateQuantity(cart, productId, item.quantity - 1) });
    } else if (button.dataset.action === 'remove') {
        setState({ cart: removeFromCart(cart, productId) });
    }
});

// Clear the whole cart
elements.clearButton.addEventListener('click', () => {
    setState({ cart: [] });
});

// Initialize
renderProducts(getState().products);
subscribe(render);
render(getState());
