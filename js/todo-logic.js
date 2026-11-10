// Pure functions only: they take data in and return new data out.
// They never touch the page or browser storage, so they are easy to test.

export const FILTERS = ['all', 'active', 'completed'];
export const DEFAULT_FILTER = 'all';

export function getNextId(todos) {
    return todos.reduce((highest, todo) => Math.max(highest, todo.id), 0) + 1;
}

export function addTodo(todos, text) {
    if (typeof text !== 'string' || text.trim() === '') {
        return todos;
    }
    const newTodo = {
        id: getNextId(todos),
        text: text.trim(),
        completed: false,
    };
    return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function updateTodoText(todos, id, text) {
    const cleaned = typeof text === 'string' ? text.trim() : '';
    if (cleaned === '') {
        return todos;
    }
    return todos.map((todo) =>
        todo.id === id ? { ...todo, text: cleaned } : todo
    );
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos, filter) {
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

export function countRemaining(todos) {
    return todos.filter((todo) => !todo.completed).length;
}

export function formatItemsLeft(count) {
    return `${count} ${count === 1 ? 'item' : 'items'} left`;
}

export function normalizeFilter(filter) {
    return FILTERS.includes(filter) ? filter : DEFAULT_FILTER;
}

// Turns anything (null, wrong types, half-broken items) into a safe array
export function normalizeTodos(raw) {
    if (!Array.isArray(raw)) {
        return [];
    }
    return raw
        .filter(
            (item) =>
                item !== null &&
                typeof item === 'object' &&
                Number.isFinite(item.id) &&
                typeof item.text === 'string' &&
                item.text.trim() !== ''
        )
        .map((item) => ({
            id: item.id,
            text: item.text,
            completed: Boolean(item.completed),
        }));
}
