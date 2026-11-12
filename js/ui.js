import {
    countRemaining,
    filterTodos,
    formatItemsLeft,
} from './todo-logic.js';

export const elements = {
    form: document.getElementById('todo-form'),
    input: document.getElementById('todo-input'),
    list: document.getElementById('todo-list'),
    itemsLeft: document.getElementById('items-left'),
    filterButtons: document.querySelectorAll('.filter'),
    clearButton: document.getElementById('clear-completed'),
};

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    li.classList.toggle('completed', todo.completed);

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text; // textContent: user text is never parsed as HTML

    const del = document.createElement('button');
    del.className = 'delete';
    del.type = 'button';
    del.textContent = '×';
    del.setAttribute('aria-label', `Delete task: ${todo.text}`);

    li.append(span, del);
    return li;
}

function createEmptyMessage(hasTodos) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = hasTodos
        ? 'No tasks in this view.'
        : 'Nothing here yet. Add your first task.';
    return li;
}

export function render({ todos, filter }) {
    const visible = filterTodos(todos, filter);
    const items =
        visible.length === 0
            ? [createEmptyMessage(todos.length > 0)]
            : visible.map(createTodoElement);

    elements.list.replaceChildren(...items);
    elements.itemsLeft.textContent = formatItemsLeft(countRemaining(todos));

    elements.filterButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.filter === filter);
    });
}

// Swaps a task's text for an input box (double-click to edit)
export function showEditor(textSpan) {
    const editor = document.createElement('input');
    editor.type = 'text';
    editor.className = 'edit-input';
    editor.value = textSpan.textContent;
    textSpan.replaceWith(editor);
    editor.focus();
    editor.select();
}
