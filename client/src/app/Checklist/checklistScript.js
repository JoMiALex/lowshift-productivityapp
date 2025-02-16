document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

//add task Function
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" onclick="toggleTask(this)">
        <span>${taskText}</span>
        <button onclick="removeTask(this)">X</button>
    `;
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}
//toggle task Function Incomplete/Complete

function toggleTask(checkbox) {
    let taskText = checkbox.nextElementSibling;
    taskText.classList.toggle("completed");
    saveTasks();
}
//Remove task Function
function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}
//Save task Function
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Load task Function
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(this)">
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button onclick="removeTask(this)">X</button>
        `;
        taskList.appendChild(li);
    });
}
