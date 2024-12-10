document.addEventListener('DOMContentLoaded', function() {
    const todoItems = ['Eat', 'Drink', 'Sleep', 'Work', 'Exercise']; // Sample to-do items
    const todoList = document.getElementById('todo-list');

    todoItems.forEach(item => {
        // Create list item (li)
        const li = document.createElement('li');

        // Create label for wrapping the checkbox and task
        const label = document.createElement('label');

        // Create checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create paragraph (p) for the to-do text
        const p = document.createElement('p');
        p.textContent = item;

        // Create a span (optional for styling or icons)
        const span = document.createElement('span');

        // Append the checkbox, paragraph, and span to the label
        label.appendChild(checkbox);
        label.appendChild(p);
        label.appendChild(span);

        // Append the label to the li
        li.appendChild(label);

        // Append the li to the ul
        todoList.appendChild(li);
    });
});
