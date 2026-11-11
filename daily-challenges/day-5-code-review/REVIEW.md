# Day 5: Code Review of My Weather Dashboard

> **Edit this file before you submit.** I wrote the questions and the
> typical findings below. Open your Week 6 Weather Dashboard, answer each
> question honestly with "yes / no / partly", and keep only the improvements
> that are true for YOUR code.

## Review questions

| Question                                      | Answer (yes / no / partly) | Notes |
| --------------------------------------------- | -------------------------- | ----- |
| Does it handle all error cases?               |                            |       |
| Is the code well-organised?                   |                            |       |
| Can another developer understand it?          |                            |       |

## Error cases to check

- [ ] City not found (404): does the user see a friendly message?
- [ ] Network offline or request failed: is the error caught?
- [ ] Empty or spaces-only search: is it blocked?
- [ ] API key missing or invalid (401): is there a clear message?
- [ ] Slow response: is there a loading state, and does it always end?
- [ ] Unexpected data shape: does the code crash if a field is missing?

## List of improvements needed

1. Add `try/catch` around every `fetch` and check `response.ok` before
   calling `response.json()`.
2. Show a loading message while waiting and always remove it (use `finally`).
3. Move the API key and URL into named constants (no magic strings).
4. Split the code into modules: `api.js` (fetch), `ui.js` (DOM), `app.js`
   (wiring), `utils.js` (formatting).
5. Break long functions into small ones that do one thing.
6. Use `textContent` instead of `innerHTML` for any text from the API.
7. Cache the DOM elements once instead of querying them repeatedly.
8. Save the last searched city in `localStorage`.
9. Add ESLint and fix every warning.
10. Write unit tests for the pure formatting functions (temperature, date).

## What I did well

- (Write at least two things, for example: clear names, working search,
  responsive layout.)

## Could another developer understand it?

(Write 2 or 3 sentences: is there a README, are the comments useful, would a
new teammate know where to start?)
