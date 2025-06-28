const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
showTasks();
button.onclick = function () {
  const text = input.value.trim();
  if (text) {
    tasks.push({ text: text, done: false });
    input.value = "";
    saveTasks();
    showTasks();
  }
};
function showTasks(){
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = "task";
    if (task.done) item.classList.add("completed");
    const checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => {
      if (task.done){
        task.done = false;
      } 
      else {
        task.done = true;
      }
      saveTasks();
      showTasks();
    };
    const span = document.createElement("span");
    span.textContent = task.text;
    const del = document.createElement("button");
    del.textContent = "X";
    del.className = "delete-btn";
    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    };
    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(del);
    list.appendChild(item);
  });
}
function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}