import {
    DEFAULT_FILTER,
    normalizeFilter,
    normalizeTodos,
} from './todo-logic.js';

const STORAGE_KEY = 'todo_app_state';

export function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return {
            todos: normalizeTodos(parsed.todos),
            filter: normalizeFilter(parsed.filter),
        };
    } catch {
        // Broken JSON, null, or storage blocked: start fresh instead of crashing
        return { todos: [], filter: DEFAULT_FILTER };
    }
}

export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn('Could not save to storage:', error);
    }
}
