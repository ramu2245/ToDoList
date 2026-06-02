const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

// ADD
form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (input.value.trim() === "") return;

  const todo = {
    id: Date.now(),
    text: input.value,
    completed: false
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  input.value = "";
});

// RENDER
function renderTodos() {
  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = "<p>No tasks yet 🚀</p>";
    return;
  }

  todos.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    // ACTION BUTTON
    const actionBtn = document.createElement("button");
    actionBtn.className = "action-btn";

    if (todo.completed) {
      actionBtn.classList.add("completed-status");
    } else {
      actionBtn.classList.add("pending-status");
    }

    actionBtn.textContent = todo.completed ? "Completed" : "Pending";

    actionBtn.setAttribute(
      "data-tooltip",
      todo.completed ? "mark as Pending" : "mark as Completed"
    );

    actionBtn.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    // DELETE BUTTON
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    btnGroup.appendChild(actionBtn);
    btnGroup.appendChild(delBtn);

    div.appendChild(span);
    div.appendChild(btnGroup);

    list.appendChild(div);
  });
}

// SAVE
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}