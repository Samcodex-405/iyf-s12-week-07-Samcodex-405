import { loadState, saveState } from './storage.js';

let state = loadState();
const listeners = [];

export function getState() {
    return state;
}

// Merge updates into the state, save it, then tell every subscriber
export function setState(updates) {
    state = { ...state, ...updates };
    saveState(state);
    listeners.forEach((listener) => listener(state));
}

// Returns a function that stops listening
export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    };
}
