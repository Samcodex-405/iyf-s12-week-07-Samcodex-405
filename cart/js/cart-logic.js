// Pure cart functions. A cart is an array of { productId, quantity }.
// Nothing here touches the page or storage, and nothing changes its inputs.

export function addToCart(cart, productId) {
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
        return cart.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    return [...cart, { productId, quantity: 1 }];
}

export function removeFromCart(cart, productId) {
    return cart.filter((item) => item.productId !== productId);
}

// Sets a quantity; a quantity of 0 or less removes the item
export function updateQuantity(cart, productId, quantity) {
    if (!Number.isInteger(quantity)) {
        return cart;
    }
    if (quantity <= 0) {
        return removeFromCart(cart, productId);
    }
    return cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
    );
}

export function getCartTotal(cart, products) {
    return cart.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

export function getCartCount(cart) {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

export function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

// Cleans saved data: keeps only valid items for products that still exist
export function normalizeCart(raw, products) {
    if (!Array.isArray(raw)) {
        return [];
    }
    return raw
        .filter(
            (item) =>
                item !== null &&
                typeof item === 'object' &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0 &&
                products.some((product) => product.id === item.productId)
        )
        .map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
}
