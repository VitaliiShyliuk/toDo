const myUL = document.querySelector(".tasks-ul");
const myButton = document.querySelector(".form-task__button");

document.addEventListener(
  "DOMContentLoaded",
  addTasksHTMLtoHTML(arrayTasksFromLocalStorage())
);

function addToArrayTasksLocalStorage(newTask) {
  const tasksData = arrayTasksFromLocalStorage();
  localStorage.setItem("tasks", JSON.stringify([...tasksData, newTask]));
}
function saveTasksLocalStorage(array) {
  localStorage.setItem("tasks", JSON.stringify(array));
}
function filterArrayTasksLocalStorage(array, filter) {
  saveTasksLocalStorage(array.filter((task) => task.body !== filter));
}

myButton.addEventListener("click", addTaskData);
myUL.addEventListener("click", handleDone);
myUL.addEventListener("click", handleRemove);

function handleRemove(event) {
  if (event.target.classList.contains("task-delete")) {
    filterArrayTasksLocalStorage(
      arrayTasksFromLocalStorage(),
      event.target.previousElementSibling.textContent
    );
    event.target.closest(".tasts-ul__item").remove();
  }
}

function addTaskData(event) {
  if (validation(event.target.previousElementSibling.value.trim())) {
    const task = {
      body: event.target.previousElementSibling.value.trim(),
      done: false,
    };
    event.target.previousElementSibling.value = "";
    addToArrayTasksLocalStorage(task);
    addTasksHTMLtoHTML(arrayTasksFromLocalStorage());
  }
}

function handleDone(event) {
  if (
    event.target.checked &&
    event.target.classList.contains("task-checkbox")
  ) {
    event.target.closest(".tasts-ul__item").classList.add("disabled-text");
    changeDoneData(event.target.nextElementSibling.textContent, true);
  } else if (
    !event.target.checked &&
    event.target.classList.contains("task-checkbox")
  ) {
    event.target.closest(".tasts-ul__item").classList.remove("disabled-text");
    changeDoneData(event.target.nextElementSibling.textContent, false);
  }
}

function changeDoneData(content, bool) {
  const tasksData = arrayTasksFromLocalStorage();
  for (let i = 0; i < tasksData.length; i++) {
    if (tasksData[i].body === content) {
      tasksData[i].done = bool;
      break;
    }
  }
  saveTasksLocalStorage(tasksData);
}

function createTaskHTML(textContent, taskDone) {
  return `
  <li class="tasts-ul__item task ${taskDone ? 'disabled-text' : ''}">
  <input type="checkbox" class="task-checkbox" ${taskDone ? 'checked' : ''}/>
  <span class="task-text">${textContent}</span>
  <span class="task-delete noselect">&#10006;</span>
  </li>
  `;
}
function createTasksHTML(tasksData) {
  const TasksHtml = tasksData.map((taskData) => {
    return createTaskHTML(taskData.body, taskData.done);
  });
  return TasksHtml.reverse().join("");
}

function addTasksHTMLtoHTML(tasksData) {
  myUL.innerHTML = createTasksHTML(tasksData);
}

function validation(text) {
  if (text) {
    return text;
  } else alert("Введите задачу");
}

function arrayTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
