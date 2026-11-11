const STORAGE_KEY = 'day1_theme';
const THEMES = ['light', 'dark'];

const toggleButton = document.getElementById('theme-toggle');
const themeName = document.getElementById('theme-name');

function getSavedTheme() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return THEMES.includes(saved) ? saved : null;
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
        console.warn('Could not save the theme:', error);
    }
}

// Saved choice first, then the device setting, then light
function getInitialTheme() {
    const saved = getSavedTheme();
    if (saved) {
        return saved;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeName.textContent = theme;
    toggleButton.setAttribute('aria-pressed', String(theme === 'dark'));
    toggleButton.textContent =
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
}

toggleButton.addEventListener('click', toggleTheme);

// Apply on page load
applyTheme(getInitialTheme());
