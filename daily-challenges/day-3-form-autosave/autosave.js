const STORAGE_KEY = 'day3_form_draft';
const AUTO_SAVE_INTERVAL_MS = 5000;

const form = document.getElementById('draft-form');
const status = document.getElementById('status');

let lastSaved = '';

function readFormData() {
    return Object.fromEntries(new FormData(form).entries());
}

function setStatus(message) {
    status.textContent = message;
}

function saveDraft() {
    const serialized = JSON.stringify(readFormData());
    if (serialized === lastSaved) {
        return; // nothing changed since the last save
    }
    try {
        localStorage.setItem(STORAGE_KEY, serialized);
        lastSaved = serialized;
        setStatus(`Draft saved at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
        console.warn('Could not save the draft:', error);
        setStatus('Could not save the draft.');
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn('Could not clear the draft:', error);
    }
    lastSaved = '';
}

function restoreDraft() {
    let draft;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        draft = raw ? JSON.parse(raw) : null;
    } catch {
        return; // broken data: ignore it and start with an empty form
    }
    if (draft === null || typeof draft !== 'object') {
        return;
    }

    Array.from(form.elements).forEach((field) => {
        if (!field.name || !(field.name in draft)) {
            return;
        }
        if (field.type === 'checkbox') {
            field.checked = draft[field.name] === 'on';
        } else {
            field.value = String(draft[field.name]);
        }
    });
    lastSaved = JSON.stringify(readFormData());
    setStatus('Draft restored from your last visit.');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearDraft();
    form.reset();
    setStatus('Submitted! Saved draft cleared.');
});

restoreDraft();
setInterval(saveDraft, AUTO_SAVE_INTERVAL_MS);
