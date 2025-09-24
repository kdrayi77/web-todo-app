// script.js

// Simple in-memory user for demo
const DEMO_USER = { username: "user", password: "pass" };

// Elements
const loginSection = document.getElementById("login-section");
const todoSection = document.getElementById("todo-section");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const progressList = document.getElementById("progress-list");
const doneList = document.getElementById("done-list");

// Store tasks in memory
let tasks = {
    todo: [],
    progress: [],
    done: []
};

// --- Login Logic ---
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
        loginSection.style.display = "none";
        todoSection.style.display = "block";
    } else {
        alert("Invalid credentials! Try user/pass");
    }
});

// --- Logout Logic ---
logoutBtn.addEventListener("click", function() {
    todoSection.style.display = "none";
    loginSection.style.display = "block";
    loginForm.reset();
});

// --- Add Task ---
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.todo.push(taskText);
        taskInput.value = "";
        renderTasks();
    }
});

// --- Render Tasks ---
function renderTasks() {
    // Clear lists
    taskList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";

    // Render To-Do
    tasks.todo.forEach((task, idx) => {
        const li = createTaskItem(task, "todo", idx);
        taskList.appendChild(li);
    });

    // Render In Progress
    tasks.progress.forEach((task, idx) => {
        const li = createTaskItem(task, "progress", idx);
        progressList.appendChild(li);
    });

    // Render Done
    tasks.done.forEach((task, idx) => {
        const li = createTaskItem(task, "done", idx);
        doneList.appendChild(li);
    });
}

// --- Create Task Item ---
function createTaskItem(task, section, idx) {
    const li = document.createElement("li");
    li.textContent = task;

    // Move buttons
    if (section === "todo") {
        const toProgressBtn = document.createElement("button");
        toProgressBtn.textContent = "→";
        toProgressBtn.title = "Move to In Progress";
        toProgressBtn.onclick = () => moveTask("todo", "progress", idx);
        li.appendChild(toProgressBtn);
    }
    if (section === "progress") {
        const toDoneBtn = document.createElement("button");
        toDoneBtn.textContent = "✓";
        toDoneBtn.title = "Mark as Done";
        toDoneBtn.onclick = () => moveTask("progress", "done", idx);
        li.appendChild(toDoneBtn);

        const toTodoBtn = document.createElement("button");
        toTodoBtn.textContent = "←";
        toTodoBtn.title = "Move back to Tasks";
        toTodoBtn.onclick = () => moveTask("progress", "todo", idx);
        li.appendChild(toTodoBtn);
    }
    if (section === "done") {
        const toProgressBtn = document.createElement("button");
        toProgressBtn.textContent = "↩";
        toProgressBtn.title = "Move back to In Progress";
        toProgressBtn.onclick = () => moveTask("done", "progress", idx);
        li.appendChild(toProgressBtn);

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.title = "Delete";
        delBtn.onclick = () => deleteTask("done", idx);
        li.appendChild(delBtn);
    }
    if (section === "todo") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.title = "Delete";
        delBtn.onclick = () => deleteTask("todo", idx);
        li.appendChild(delBtn);
    }
    if (section === "progress") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.title = "Delete";
        delBtn.onclick = () => deleteTask("progress", idx);
        li.appendChild(delBtn);
    }
    return li;
}

// --- Move Task ---
function moveTask(from, to, idx) {
    const [task] = tasks[from].splice(idx, 1);
    tasks[to].push(task);
    renderTasks();
}

// --- Delete Task ---
function deleteTask(section, idx) {
    tasks[section].splice(idx, 1);
    renderTasks();
}

// Initial render
renderTasks();