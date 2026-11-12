// Pure helpers for the recent-searches list (no page or storage code)

export const MAX_RECENT_SEARCHES = 5;

// Newest first, no duplicates (ignoring case), never longer than max
export function addRecentSearch(history, term, max = MAX_RECENT_SEARCHES) {
    const cleaned = typeof term === 'string' ? term.trim() : '';
    if (cleaned === '') {
        return history;
    }
    const withoutDuplicate = history.filter(
        (item) => item.toLowerCase() !== cleaned.toLowerCase()
    );
    return [cleaned, ...withoutDuplicate].slice(0, max);
}

// Cleans saved data so a broken value can never crash the page
export function normalizeHistory(raw, max = MAX_RECENT_SEARCHES) {
    if (!Array.isArray(raw)) {
        return [];
    }
    return raw
        .filter((item) => typeof item === 'string' && item.trim() !== '')
        .map((item) => item.trim())
        .slice(0, max);
}
