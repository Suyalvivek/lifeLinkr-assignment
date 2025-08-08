import { doAjaxCall } from "../data/service/ajax.js";
import { CONSTANTS } from "../data/service/config.js";
import { validateName } from "../data/service/validation.js";

// Global variables
let allTodos = []; // All todos with mocked dates
let filteredTodos = []; // Filtered todos for display
let currentPage = 0; // Current page
const limit = 10; // Todos per page

// Bind events on page load
window.addEventListener("load", bindEvents);

function bindEvents() {
  document.querySelector("#addTodo").addEventListener("click", addTask);
  document.querySelector("#loadFromServer").addEventListener("click", loadFromServer);
  document.querySelector("#searchButton").addEventListener("click", applyFilters);
  document.querySelector("#filterButton").addEventListener("click", applyFilters);
  document.querySelector("#nextPage").addEventListener("click", nextPage);
  document.querySelector("#prevPage").addEventListener("click", prevPage);
}

// Validate task name
function verifyFields(task) {
  document.querySelector("#name-error").innerText = "";
  const nameError = validateName(task.name);
  if (nameError) {
    document.querySelector("#name-error").innerText = nameError;
    return false;
  }
  return true;
}

// Load all todos from server
async function loadFromServer() {
  document.querySelector("#loading").style.display = "block"; // Show loading
  try {
    const result = await doAjaxCall(150, 0); // Fetch all todos
    allTodos = result.todos.map(todo => ({
      ...todo,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0] // Mock date
    }));
    applyFilters(); // Apply filters and display
    document.querySelector("#loading").style.display = "none";
  } catch (error) {
    document.querySelector("#loading").style.display = "none";
    console.error("Error loading todos:", error);
    document.querySelector("#name-error").innerText = "Failed to load todos";
  }
}

// Filter todos by search and date
function applyFilters() {
  const searchTerm = document.querySelector("#searchInput").value.toLowerCase();
  const fromDate = document.querySelector("#startDate").value;
  const toDate = document.querySelector("#endDate").value;

  filteredTodos = allTodos.filter(todo => {
    const matchesSearch = todo.todo.toLowerCase().includes(searchTerm);
    const matchesDate = (!fromDate || todo.date >= fromDate) && (!toDate || todo.date <= toDate);
    return matchesSearch && matchesDate;
  });

  currentPage = 0; // Reset to first page
  printTaskTable();
  updatePageInfo();
  updatePaginationButtons();
}

// Display todos for current page
function printTaskTable() {
  document.querySelector("#todo-table-body").innerHTML = "";
  const start = currentPage * limit;
  const end = start + limit;
  filteredTodos.slice(start, end).forEach(printTask);
}

// Create a table row for a single todo
function printTask(taskObject) {
  const tbody = document.querySelector("#todo-table-body");
  const tr = tbody.insertRow();
  // Display specific fields in order: id, todo, date, completed
  [taskObject.id, taskObject.todo, taskObject.date, taskObject.completed ? "Yes" : "No"].forEach(value => {
    const td = tr.insertCell();
    td.innerText = value;
  });
}

// Update page info
function updatePageInfo() {
  document.querySelector("#pageInfo").innerText = `Page ${currentPage + 1}`;
}

// Update pagination buttons
function updatePaginationButtons() {
  const prevBtn = document.querySelector("#prevPage");
  const nextBtn = document.querySelector("#nextPage");
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = (currentPage + 1) * limit >= filteredTodos.length;
}

// Next page
function nextPage() {
  if ((currentPage + 1) * limit < filteredTodos.length) {
    currentPage++;
    printTaskTable();
    updatePageInfo();
    updatePaginationButtons();
  }
}

// Previous page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    printTaskTable();
    updatePageInfo();
    updatePaginationButtons();
  }
}

// Add new todo
async function addTask() {
  const taskObject = {
    name: document.querySelector("#todo").value.trim(),
    date: document.querySelector("#date").value.trim() || new Date().toISOString().split("T")[0]
  };

  if (!verifyFields(taskObject)) return;

  document.querySelector("#loading").style.display = "block"; // Show loading
  try {
    const res = await axios.post(`${CONSTANTS.API_URL}/add`, {
      todo: taskObject.name,
      completed: false,
      userId: 1
    });
    allTodos.push({ ...res.data, date: taskObject.date }); // Add with date
    applyFilters(); // Refresh display
    document.querySelector("#todo").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#name-error").innerText = "";
    document.querySelector("#loading").style.display = "none";
  } catch (error) {
    document.querySelector("#loading").style.display = "none";
    console.error("Error adding task:", error);
    document.querySelector("#name-error").innerText = "Failed to add task";
  }
}