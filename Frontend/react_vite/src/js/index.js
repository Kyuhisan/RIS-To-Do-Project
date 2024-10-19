// Function to add a new Task Group
function addTaskGroup() {
  const groupInput = document.getElementById("groupInput");
  const groupName = groupInput.value.trim();

  if (groupName === "") {
    alert("Please enter a task group name!");
    return;
  }

  // Create Task Group Elements
  const groupDiv = document.createElement("div");
  groupDiv.className = "task-group";

  const groupHeader = document.createElement("div");
  groupHeader.className = "group-header";

  const groupTitle = document.createElement("h2");
  groupTitle.textContent = groupName;

  const deleteGroupBtn = document.createElement("button");
  deleteGroupBtn.className = "delete-group";
  deleteGroupBtn.textContent = "Delete Group";
  deleteGroupBtn.onclick = function () {
    if (confirm("Are you sure you want to delete this group?")) {
      groupDiv.remove();
    }
  };

  groupHeader.appendChild(groupTitle);
  groupHeader.appendChild(deleteGroupBtn);

  // Progress Bar
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressContainer.appendChild(progressBar);

  // Add Task Section
  const addTaskDiv = document.createElement("div");
  addTaskDiv.className = "add-task";

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.placeholder = "Enter new task name";

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.onclick = function () {
    addTask(taskList, progressBar);
  };

  addTaskDiv.appendChild(taskInput);
  addTaskDiv.appendChild(addTaskBtn);

  // Task List
  const taskList = document.createElement("ul");
  taskList.className = "task-list";

  // Append all to groupDiv
  groupDiv.appendChild(groupHeader);
  groupDiv.appendChild(progressContainer);
  groupDiv.appendChild(addTaskDiv);
  groupDiv.appendChild(taskList);

  // Append groupDiv to groupsContainer
  document.getElementById("groupsContainer").appendChild(groupDiv);

  // Clear input
  groupInput.value = "";
}

// Function to add a Task to a Task List
function addTask(taskList, progressBar) {
  const addTaskDiv = taskList.previousSibling;
  const taskInput = addTaskDiv.querySelector("input");
  const taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a task name!");
    return;
  }

  // Create Task Item Elements
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";
  checkbox.disabled = true; // We'll use state selector instead

  const taskNameSpan = document.createElement("span");
  taskNameSpan.className = "task-name";
  taskNameSpan.textContent = taskName;

  const taskStateDiv = document.createElement("div");
  taskStateDiv.className = "task-state";

  const stateSelect = document.createElement("select");
  const states = ["Unfinished", "WIP", "Done"];
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  stateSelect.onchange = function () {
    updateProgress(progressBar, taskList);
    updateStateDisplay(taskItem, stateSelect.value);
  };

  taskStateDiv.appendChild(stateSelect);

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.className = "delete-task";
  deleteTaskBtn.textContent = "Delete";
  deleteTaskBtn.onclick = function () {
    if (confirm("Are you sure you want to delete this task?")) {
      taskItem.remove();
      updateProgress(progressBar, taskList);
    }
  };

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskNameSpan);
  taskItem.appendChild(taskStateDiv);
  taskItem.appendChild(deleteTaskBtn);

  taskList.appendChild(taskItem);

  // Update progress
  updateProgress(progressBar, taskList);

  // Clear input
  taskInput.value = "";
}

// Function to update the progress bar based on task states
function updateProgress(progressBar, taskList) {
  const tasks = taskList.querySelectorAll(".task-item");
  if (tasks.length === 0) {
    progressBar.style.width = "0%";
    progressBar.style.backgroundColor = "#28a745";
    return;
  }

  let doneCount = 0;
  tasks.forEach((task) => {
    const state = task.querySelector("select").value;
    if (state === "Done") doneCount++;
  });

  const progressPercent = Math.round((doneCount / tasks.length) * 100);
  progressBar.style.width = progressPercent + "%";

  // Change progress bar color based on progress
  if (progressPercent === 100) {
    progressBar.style.backgroundColor = "#28a745"; // Green
  } else if (progressPercent > 0) {
    progressBar.style.backgroundColor = "#ffc107"; // Yellow
  } else {
    progressBar.style.backgroundColor = "#dc3545"; // Red
  }
}

// Function to update task state display
function updateStateDisplay(taskItem, state) {
  const taskName = taskItem.querySelector(".task-name");
  taskName.classList.remove("state-Unfinished", "state-WIP", "state-Done");

  if (state === "Unfinished") {
    taskName.classList.add("state-Unfinished");
  } else if (state === "WIP") {
    taskName.classList.add("state-WIP");
  } else if (state === "Done") {
    taskName.classList.add("state-Done");
  }
}
