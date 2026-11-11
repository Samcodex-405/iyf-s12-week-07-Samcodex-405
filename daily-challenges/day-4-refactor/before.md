# Day 4 — The messy code (before)

This is the "debug this code" exercise from Task 14.3. It looks fine at a
glance, but it hides several bugs.

```js
function calculateOrderTotal(items) {
    let total = 0;

    for (let i = 0; i <= items.length; i++) {
        const item = items[i];
        total += item.price * item.quanity;
    }

    if (total > 100) {
        total = total * 0.9; // 10% discount
    }

    return total;
}
```

## Problems found

| #   | Problem                                           | Effect                                                          |
| --- | ------------------------------------------------- | --------------------------------------------------------------- |
| 1   | `i <= items.length` goes one step too far         | `items[3]` is `undefined`, so `item.price` throws a TypeError   |
| 2   | `item.quanity` is a typo for `quantity`           | Every line total is `NaN`                                       |
| 3   | Magic numbers `100` and `0.9`                     | Nobody knows what they mean or where to change them             |
| 4   | One function does summing and discounting         | Hard to test or reuse                                           |
| 5   | No error handling for bad input                   | Crashes on `null`, a non-array, or an item with a missing price |
| 6   | Floating point result such as `62.10000000000001` | Ugly prices                                                     |
