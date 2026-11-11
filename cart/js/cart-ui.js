import { formatPrice, getCartCount, getCartTotal } from './cart-logic.js';

export const elements = {
    productList: document.getElementById('product-list'),
    cartList: document.getElementById('cart-list'),
    cartEmpty: document.getElementById('cart-empty'),
    cartCount: document.getElementById('cart-count'),
    cartTotal: document.getElementById('cart-total'),
    clearButton: document.getElementById('clear-cart'),
};

function createButton(className, text, label, dataset = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;
    button.setAttribute('aria-label', label);
    Object.assign(button.dataset, dataset);
    return button;
}

function createProductCard(product) {
    const li = document.createElement('li');
    li.className = 'product-card';

    const image = document.createElement('div');
    image.className = 'product-image';
    image.textContent = product.image;
    image.setAttribute('aria-hidden', 'true');

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = product.name;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = formatPrice(product.price);

    const addButton = createButton(
        'btn add-to-cart',
        'Add to Cart',
        `Add ${product.name} to cart`,
        { id: product.id }
    );

    li.append(image, name, price, addButton);
    return li;
}

function createCartItem(item, product) {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const name = document.createElement('div');
    name.className = 'cart-item-name';
    name.textContent = `${product.image} ${product.name}`;

    const lineTotal = document.createElement('div');
    lineTotal.className = 'cart-item-total';
    lineTotal.textContent = formatPrice(product.price * item.quantity);

    const controls = document.createElement('div');
    controls.className = 'quantity-controls';

    const quantity = document.createElement('span');
    quantity.textContent = item.quantity;
    quantity.setAttribute('aria-label', `Quantity: ${item.quantity}`);

    controls.append(
        createButton('qty-btn', '−', `Decrease ${product.name} quantity`, {
            action: 'decrease',
            id: product.id,
        }),
        quantity,
        createButton('qty-btn', '+', `Increase ${product.name} quantity`, {
            action: 'increase',
            id: product.id,
        })
    );

    const removeButton = createButton(
        'remove-btn',
        'Remove',
        `Remove ${product.name} from cart`,
        { action: 'remove', id: product.id }
    );

    li.append(name, lineTotal, controls, removeButton);
    return li;
}

// The product list never changes, so it is drawn once
export function renderProducts(products) {
    elements.productList.replaceChildren(...products.map(createProductCard));
}

export function render({ products, cart }) {
    const rows = cart
        .map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return product ? createCartItem(item, product) : null;
        })
        .filter(Boolean);

    elements.cartList.replaceChildren(...rows);
    elements.cartEmpty.hidden = cart.length > 0;
    elements.clearButton.hidden = cart.length === 0;
    elements.cartCount.textContent = getCartCount(cart);
    elements.cartTotal.textContent = formatPrice(getCartTotal(cart, products));
}
