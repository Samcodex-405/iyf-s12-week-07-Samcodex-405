import { getState, setState, subscribe } from './state.js';
import { elements, render, showEditor } from './ui.js';
import {
    addTodo,
    clearCompleted,
    deleteTodo,
    toggleTodo,
    updateTodoText,
} from './todo-logic.js';

function getTodoId(element) {
    const item = element.closest('li.todo-item');
    return item ? Number(item.dataset.id) : null;
}

// Add a task
elements.form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the page reloading
    setState({ todos: addTodo(getState().todos, elements.input.value) });
    elements.input.value = ''; // clear the input
    elements.input.focus();
});

// ONE click listener on the list (event delegation)
elements.list.addEventListener('click', (event) => {
    const id = getTodoId(event.target);
    if (id === null || event.target.closest('input.edit-input')) {
        return;
    }
    if (event.target.closest('button.delete')) {
        setState({ todos: deleteTodo(getState().todos, id) });
    } else {
        setState({ todos: toggleTodo(getState().todos, id) });
    }
});

// Bonus: double-click to edit
elements.list.addEventListener('dblclick', (event) => {
    const textSpan = event.target.closest('.todo-text');
    if (textSpan) {
        showEditor(textSpan);
    }
});

// Enter saves, Escape cancels
elements.list.addEventListener('keydown', (event) => {
    const editor = event.target.closest('input.edit-input');
    if (!editor) {
        return;
    }
    const id = getTodoId(editor);

    if (event.key === 'Enter') {
        if (editor.value.trim() === '') {
            return;
        }
        setState({
            todos: updateTodoText(getState().todos, id, editor.value),
        });
    } else if (event.key === 'Escape') {
        render(getState()); // cancel: redraw from the unchanged state
    }
});

// Filters (saved, so the chosen filter survives a refresh)
elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setState({ filter: button.dataset.filter });
    });
});

// Clear completed
elements.clearButton.addEventListener('click', () => {
    setState({ todos: clearCompleted(getState().todos) });
});

// Initialize
subscribe(render);
render(getState());
