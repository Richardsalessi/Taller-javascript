    let todos = [];

    function addTodo() {
    const titleInput = document.getElementById("todo-title");
    const dateInput = document.getElementById("date-picker");

    const title = titleInput.value;
    const dueDate = dateInput.value;

    if (!title) return alert("Escribe una tarea.");

    const id = Date.now().toString();
    todos.push({ id, title, dueDate, completed: false });

    titleInput.value = "";
    render();
    }

    function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
    }

    function render() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    todos.forEach(todo => {
        const item = document.createElement("div");
        item.className = "todo-item";

        item.innerHTML = `
        <span>${todo.title} (${todo.dueDate})</span>
        <button onclick="deleteTodo('${todo.id}')">Eliminar</button>
        `;

        list.appendChild(item);
    });
    }
