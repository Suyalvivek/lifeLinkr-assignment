//DOM Manipulation for Todo Application
import { doAjaxCall } from '../data/service/ajax.js';
import { todoOperations } from '../data/service/todo-operations.js';

window.addEventListener('load', bindEvents);
function bindEvents() {
    //register an event listener for the addTodo button
    document.querySelector('#addTodo').addEventListener('click', addTask);
    document.querySelector('#loadFromServer').addEventListener('click', loadFromServer);
}
export async function addTask() {
  console.log("Add Task button clicked");

  const taskObject = {};
  const fields = ["id", "name", "description", "date"];

  for (let field of fields) {
    taskObject[field] = document.querySelector(`#${field}`).value.trim();
  }

  try {
    const res = await axios.post("https://dummyjson.com/todos/add", {
      todo: taskObject.name,
      completed: false,
      userId: 1 // required by dummyjson API
    });
    
    console.log("Task added:", res.data);

    // Clear form fields after success
    fields.forEach(field => document.querySelector(`#${field}`).value = "");

    // Optionally re-fetch and render updated list
    // loadTodos();
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task. Please try again.");
  }
}
async function loadFromServer() {
    try {
    const result = await doAjaxCall();
    console.log("Result from server:", result.todos);
    todoOperations.tasks = result['todos'];
    printTaskTable(todoOperations.tasks);
    } catch (error) {
        console.log("Error loading data from server:", error);
    }

}
function printTaskTable(tasks) {
    // Clear the table body before adding rows
    document.querySelector('#todo-table-body').innerHTML = "";
    tasks.forEach(printTask);
}
function printTask(taskObject) {
    const tbody = document.querySelector('#todo-table-body');
    const tr = tbody.insertRow();
    for (let key in taskObject) {
        const td = tr.insertCell();
        td.innerText = taskObject[key];
    }
     
}
