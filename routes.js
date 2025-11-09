const express = require("express");
const router = express.Router();

let tasks = [];
let nextId = 1;

function getTaskById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      return tasks[i];
    }
  }
  return null;
}

// check if task data is valid
function checkTaskData(title, description) {
  if (!title || title.trim().length === 0) {
    return { valid: false, message: "Title is required" };
  }
  if (!description || description.trim().length === 0) {
    return { valid: false, message: "Description is required" };
  }
  return { valid: true };
}

// home route for tasks
router.get("/", (req, res) => {
  res.json({
    message: "Task Management API",
    endpoints: {
      "GET /tasks": "Get all tasks",
      "GET /tasks/:id": "Get task by ID",
      "POST /tasks": "Create new task",
      "PUT /tasks/:id": "Update task by ID",
      "DELETE /tasks/:id": "Delete task by ID",
    },
  });
});

// get all tasks
router.get("/tasks", (req, res) => {
  res.json({
    count: tasks.length,
    tasks: tasks,
  });
});

// get single task
router.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = getTaskById(taskId);

  if (!task) {
    return res.status(404).json({
      error: "Task not found with id: " + taskId,
    });
  }

  res.json(task);
});

// create new task
router.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;

  const validation = checkTaskData(title, description);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const newTask = {
    id: nextId,
    title: title.trim(),
    description: description.trim(),
    completed: completed ? true : false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  nextId++;

  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
});

// update task
router.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  const task = getTaskById(taskId);
  if (!task) {
    return res.status(404).json({
      error: "Cannot update - task not found with id: " + taskId,
    });
  }

  const validation = checkTaskData(title, description);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  task.title = title.trim();
  task.description = description.trim();
  if (completed !== undefined) {
    task.completed = completed ? true : false;
  }
  task.updatedAt = new Date().toISOString();

  res.json({
    message: "Task updated",
    task: task,
  });
});

// delete task
router.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  let taskIndex = -1;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      taskIndex = i;
      break;
    }
  }

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Cannot delete - task not found with id: " + taskId,
    });
  }

  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
});

module.exports = router;
