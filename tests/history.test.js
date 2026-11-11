import { describe, it, expect } from 'vitest';
import {
    addRecentSearch,
    normalizeHistory,
} from '../daily-challenges/day-2-recent-searches/history.js';

describe('addRecentSearch', () => {
    it('puts the newest search first', () => {
        expect(addRecentSearch(['a', 'b'], 'c')).toEqual(['c', 'a', 'b']);
    });

    it('keeps only the last 5', () => {
        const full = ['1', '2', '3', '4', '5'];
        expect(addRecentSearch(full, '6')).toEqual(['6', '1', '2', '3', '4']);
    });

    it('moves a repeated search to the top without duplicating it', () => {
        expect(addRecentSearch(['a', 'b', 'c'], 'B')).toEqual(['B', 'a', 'c']);
    });

    it('ignores blank searches and does not change the original', () => {
        const original = ['a'];
        expect(addRecentSearch(original, '   ')).toEqual(['a']);
        addRecentSearch(original, 'z');
        expect(original).toEqual(['a']);
    });
});

describe('normalizeHistory', () => {
    it('returns an empty list for broken data', () => {
        expect(normalizeHistory(null)).toEqual([]);
        expect(normalizeHistory([1, '', '  ', 'ok'])).toEqual(['ok']);
    });
});
