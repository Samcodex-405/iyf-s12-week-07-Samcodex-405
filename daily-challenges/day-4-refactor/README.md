# Day 4: Refactor Challenge

I took the buggy `calculateOrderTotal` function (see `before.md`) and rewrote
it in `order-total.js`.

## What changed

- **Error handling:** bad input (not an array, missing price, zero quantity)
  throws a clear error instead of a confusing crash.
- **Meaningful names:** `DISCOUNT_THRESHOLD`, `DISCOUNT_RATE`,
  `calculateSubtotal`, `applyDiscount`.
- **Extracted functions:** one job each (validate, subtotal, discount, round).
- **Comments** only where the reason is not obvious.

## Proof

`tests/order-total.test.js` checks the expected results from the exercise:
69 before the discount, and 135 for a 150 order after the 10% discount.
Run `npm test` to see them pass.
