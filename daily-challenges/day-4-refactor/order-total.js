// Day 4 refactor: the same calculation, cleaned up.
// Fixes: off-by-one loop, "quanity" typo, magic numbers, mixed jobs,
// missing error handling and floating point rounding.

export const DISCOUNT_THRESHOLD = 100;
export const DISCOUNT_RATE = 0.1;

function isValidItem(item) {
    return (
        item !== null &&
        typeof item === 'object' &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
}

function roundToCents(amount) {
    return Math.round(amount * 100) / 100;
}

// Adds up price x quantity for every item
export function calculateSubtotal(items) {
    if (!Array.isArray(items)) {
        throw new TypeError('items must be an array');
    }
    const subtotal = items.reduce((sum, item) => {
        if (!isValidItem(item)) {
            throw new Error(`Invalid order item: ${JSON.stringify(item)}`);
        }
        return sum + item.price * item.quantity;
    }, 0);
    return roundToCents(subtotal);
}

// 10% off orders over the threshold
export function applyDiscount(subtotal) {
    if (subtotal > DISCOUNT_THRESHOLD) {
        return roundToCents(subtotal * (1 - DISCOUNT_RATE));
    }
    return subtotal;
}

export function calculateOrderTotal(items) {
    return applyDiscount(calculateSubtotal(items));
}
