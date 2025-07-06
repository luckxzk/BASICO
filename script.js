let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "Todas";

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const category = document.getElementById("categorySelect").value;
  const priority = document.getElementById("prioritySelect").value;

  if (text === "") return;

  const task = {
    id: Date.now(),
    text,
    category,
    priority,
    done: false
  };

  tasks.push(task);
  saveTasks();
  document.getElementById("taskInput").value = "";
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.done = !task.done;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  currentFilter = type;
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  const filterBtn = document.getElementById("filter" + type);
  if (filterBtn) filterBtn.classList.add("active");
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = tasks.filter(task => {
    return currentFilter === "Todas" || task.category === currentFilter;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <div class="meta">${task.category} • Prioridade: ${task.priority}</div>
      </div>
      <div class="task-buttons">
        <button onclick="toggleTask(${task.id})">${task.done ? "↩" : "✔"}</button>
        <button onclick="deleteTask(${task.id})" class="delete-btn">✖</button>
      </div>
    `;
    list.appendChild(li);
  });

  updateCounter();
}

function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  document.getElementById("counter").innerText = `${total} tarefas | ${done} concluídas`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
