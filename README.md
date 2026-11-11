# Week 7: JavaScript Best Practices — To-Do List Refactor

**Student:** Samcodex-405
**Course:** IYF Weekend Academy, Season 12
**Repository:** iyf-s12-week-07-Samcodex-405

## Live Demo

https://samcodex-405.github.io/iyf-s12-week-07-Samcodex-405/

- To-Do List: the page above
- Shopping Cart: https://samcodex-405.github.io/iyf-s12-week-07-Samcodex-405/cart/
- Daily Challenges: https://samcodex-405.github.io/iyf-s12-week-07-Samcodex-405/daily-challenges/

## What I Built

### To-Do List (refactored from Week 5)

My Week 5 To-Do List, made professional:

- Everything it did in Week 5: add tasks, tick them off, delete, filter (All / Active / Completed), "items left" counter, clear completed, and double-click to edit.
- **Persistence:** tasks and the selected filter are saved in `localStorage` and survive a refresh.
- **Safe loading:** missing or broken saved data never crashes the app. It falls back to an empty list.
- **Modules:** the single `app.js` is split into five ES modules, each with one job.
- **Tested:** unit tests cover the pure logic, including an edge case and a check that the original array is never changed.
- **Linted and formatted:** ESLint 9 (flat config) and Prettier.

### Shopping Cart (Lesson 13)

- Product list with an "Add to Cart" button
- Change quantity with + and −, and an item is removed when it reaches 0
- Remove items, clear the cart, live total, and item count in the header
- Cart is saved in `localStorage` and survives a refresh
- Centralized state, with pure cart functions that are unit tested

### Daily Challenges

| Day | Challenge |
| --- | --------- |
| 1 | Theme toggle that saves light/dark mode in `localStorage` |
| 2 | Search box that saves and replays the last 5 searches |
| 3 | Form that auto-saves every 5 seconds and recovers after a refresh |
| 4 | Refactor of a buggy order total function (error handling, naming, extracted functions) |
| 5 | Code review of my Week 6 Weather Dashboard with a list of improvements |

## How to Run

You need Node 22 or 24.

```bash
node --version
npm install
npm test          # runs all unit tests (Vitest)
npm run lint      # ESLint
npm run format    # Prettier
```

The pages use ES modules, so open them from a local server and not by double-clicking the file:

```bash
python3 -m http.server 5500
```

Then visit http://localhost:5500/.

## Project Structure

```
index.html, styles.css          To-Do List page
js/
  app.js                        entry point: connects events to actions
  state.js                      central state with subscribe
  storage.js                    safe localStorage save and load
  todo-logic.js                 pure functions (no DOM, no storage)
  ui.js                         all DOM drawing
tests/
  todo-logic.test.js            To-Do List tests
  cart-logic.test.js            cart tests
  history.test.js               Day 2 tests
  order-total.test.js           Day 4 tests
cart/                           Lesson 13 Shopping Cart
daily-challenges/               Days 1 to 5
eslint.config.js                ESLint 9 flat config
.prettierrc                     Prettier rules
package.json, package-lock.json
.gitignore
```

## Testing

`npm test` runs 41 tests in 4 files with Vitest.

The To-Do List tests (`tests/todo-logic.test.js`) cover:

- adding, toggling, deleting, editing, filtering and counting
- an **edge case:** empty and spaces-only text is ignored
- a check that **the original array is not changed**
- broken saved data being cleaned up safely

`todo-logic.js` has no `document` and no `localStorage` in it, so it can be tested on its own.

## Collaboration

Reviewed: <link to the PR I opened on my partner's repository>

Partner's PR on my repository: <link to the refactor/modules PR into main>

## What I Learned

- Pure functions are easy to test because they never touch the page or storage.
- `localStorage` only stores strings, so data needs `JSON.stringify` and `JSON.parse`, and loading must be wrapped in `try/catch`.
- Small modules with one job each are easier to read, test and review.
- ESLint and Prettier catch mistakes and keep the code consistent, and tests give me confidence to refactor.