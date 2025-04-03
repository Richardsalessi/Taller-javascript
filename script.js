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

    function editTodo(id) {
    const newTitle = prompt("Edita la tarea:");
    if (newTitle) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
        todo.title = newTitle;
        render();
        }
    }
    }

    function toggleCompleted(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
    }
    }

    function render() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    todos.forEach(todo => {
        const item = document.createElement("div");
        item.className = "todo-item" + (todo.completed ? " completed" : "");

        item.innerHTML = `
        <span>${todo.title} (${todo.dueDate})</span>
        <div>
            <button onclick="toggleCompleted('${todo.id}')">
            ${todo.completed ? "Desmarcar" : "Completado"}
            </button>
            <button onclick="editTodo('${todo.id}')">Editar</button>
            <button onclick="deleteTodo('${todo.id}')">Eliminar</button>
        </div>
        `;

        list.appendChild(item);
    });
    }
