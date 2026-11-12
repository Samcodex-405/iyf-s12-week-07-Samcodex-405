import { describe, it, expect } from 'vitest';
import {
    addTodo,
    clearCompleted,
    countRemaining,
    deleteTodo,
    filterTodos,
    formatItemsLeft,
    getNextId,
    normalizeFilter,
    normalizeTodos,
    toggleTodo,
    updateTodoText,
} from '../js/todo-logic.js';

const sample = [
    { id: 1, text: 'Learn Vitest', completed: false },
    { id: 2, text: 'Fix lint', completed: true },
];

describe('addTodo', () => {
    it('adds a trimmed todo with the next id', () => {
        const result = addTodo(sample, '  Buy milk  ');
        expect(result).toHaveLength(3);
        expect(result[2]).toEqual({
            id: 3,
            text: 'Buy milk',
            completed: false,
        });
    });

    it('ignores empty or spaces-only text (edge case)', () => {
        expect(addTodo(sample, '')).toEqual(sample);
        expect(addTodo(sample, '   ')).toEqual(sample);
    });

    it('does not change the original array', () => {
        const original = [...sample];
        const result = addTodo(original, 'New task');
        expect(original).toHaveLength(2);
        expect(original).toEqual(sample);
        expect(result).not.toBe(original);
    });
});

describe('getNextId', () => {
    it('starts at 1 for an empty list', () => {
        expect(getNextId([])).toBe(1);
    });

    it('goes one above the highest id', () => {
        expect(getNextId(sample)).toBe(3);
    });
});

describe('toggleTodo', () => {
    it('flips completed only for the matching id', () => {
        const result = toggleTodo(sample, 1);
        expect(result[0].completed).toBe(true);
        expect(result[1].completed).toBe(true);
    });

    it('does not mutate the original todo objects', () => {
        toggleTodo(sample, 1);
        expect(sample[0].completed).toBe(false);
    });
});

describe('deleteTodo and clearCompleted', () => {
    it('removes the todo with the given id', () => {
        expect(deleteTodo(sample, 1).map((t) => t.id)).toEqual([2]);
    });

    it('removes every completed todo', () => {
        expect(clearCompleted(sample).map((t) => t.id)).toEqual([1]);
    });
});

describe('updateTodoText', () => {
    it('changes the text of one todo', () => {
        const result = updateTodoText(sample, 1, '  Learn ESLint ');
        expect(result[0].text).toBe('Learn ESLint');
        expect(sample[0].text).toBe('Learn Vitest');
    });

    it('keeps the old text when the new text is blank', () => {
        expect(updateTodoText(sample, 1, '   ')).toEqual(sample);
    });
});

describe('filterTodos, countRemaining, formatItemsLeft', () => {
    it('filters by status', () => {
        expect(filterTodos(sample, 'active')).toHaveLength(1);
        expect(filterTodos(sample, 'completed')).toHaveLength(1);
        expect(filterTodos(sample, 'all')).toHaveLength(2);
    });

    it('counts unfinished todos', () => {
        expect(countRemaining(sample)).toBe(1);
    });

    it('uses singular and plural correctly', () => {
        expect(formatItemsLeft(1)).toBe('1 item left');
        expect(formatItemsLeft(0)).toBe('0 items left');
        expect(formatItemsLeft(5)).toBe('5 items left');
    });
});

describe('loading broken saved data', () => {
    it('returns an empty list for non-array data', () => {
        expect(normalizeTodos(null)).toEqual([]);
        expect(normalizeTodos('oops')).toEqual([]);
    });

    it('drops invalid items and keeps valid ones', () => {
        const messy = [null, 5, { text: 'no id' }, { id: 7, text: 'ok' }];
        expect(normalizeTodos(messy)).toEqual([
            { id: 7, text: 'ok', completed: false },
        ]);
    });

    it('falls back to "all" for an unknown filter', () => {
        expect(normalizeFilter('banana')).toBe('all');
        expect(normalizeFilter(undefined)).toBe('all');
    });
});