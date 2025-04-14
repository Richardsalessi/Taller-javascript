let todos = [];
let editId = null;

function saveToLocalStorage() {
localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
const data = localStorage.getItem("todos");
if (data) {
    todos = JSON.parse(data);
    render();
}
}

function addTodo() {
const titleInput = document.getElementById("todo-title");
const dateInput = document.getElementById("date-picker");

const title = titleInput.value;
const dueDate = dateInput.value;

if (!title) return alert("Escribe una entrega.");
const id = Date.now().toString();

todos.push({ id, title, dueDate, completed: false });

titleInput.value = "";
dateInput.value = "";

saveToLocalStorage();
render();
}

function deleteTodo(id) {
todos = todos.filter(todo => todo.id !== id);
saveToLocalStorage();
render();
}

function editTodo(id) {
const todo = todos.find(t => t.id === id);
if (todo) {
    editId = id;
    document.getElementById("edit-input").value = todo.title;
    document.getElementById("edit-modal").classList.remove("hidden");
}
}

function confirmEdit() {
const newTitle = document.getElementById("edit-input").value.trim();
if (newTitle && editId) {
    const todo = todos.find(t => t.id === editId);
    if (todo) {
    todo.title = newTitle;
    saveToLocalStorage();
    render();
    closeModal();
    }
}
}

function closeModal() {
document.getElementById("edit-modal").classList.add("hidden");
editId = null;
}

function toggleCompleted(id) {
const todo = todos.find(t => t.id === id);
if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
    render();
}
}

function getEstadoClase(dueDate, completed) {
if (completed) return "";

const hoy = new Date();
const fechaEntrega = new Date(dueDate);
const diff = Math.ceil((fechaEntrega - hoy) / (1000 * 60 * 60 * 24));

if (diff < 0) return "vencida";
if (diff <= 2) return "alerta";
return "";
}

function render() {
const list = document.getElementById("todo-list");
list.innerHTML = "";

const pendientes = todos.filter(t => !t.completed).length;
document.getElementById("pendientes").innerText = `Tienes ${pendientes} entregas pendientes`;

todos.forEach(todo => {
    const item = document.createElement("div");

    const estadoClase = getEstadoClase(todo.dueDate, todo.completed);
    item.className = `todo-item ${todo.completed ? "completed" : ""} ${estadoClase}`;

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

function exportarTareas() {
let texto = "Tareas:\n\n";
todos.forEach(t => {
    texto += `- ${t.title} (${t.dueDate}) ${t.completed ? "[✓]" : "[ ]"}\n`;
});

const blob = new Blob([texto], { type: "text/plain" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "entregas.txt";
link.click();
}

window.onload = loadFromLocalStorage;
document.getElementById("add-todo").onclick = addTodo;