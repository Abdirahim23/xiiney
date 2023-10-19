// todo.js

const fs = require('fs');
const readline = require('readline');

const todoFile = './todo.txt';

// Function to load tasks from the file
function loadTasks() {
  try {
    const data = fs.readFileSync(todoFile, 'utf8');
    return data.trim().split('\n');
  } catch (error) {
    // Return an empty array if the file doesn't exist or there was an error reading it
    return [];
  }
}

// Function to save tasks to the file
function saveTasks(tasks) {
  const data = tasks.join('\n');
  fs.writeFileSync(todoFile, data);
}

// Function to add a task
function addTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

// Function to update a task
function updateTask(index, task) {
  const tasks = loadTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index] = task;
    saveTasks(tasks);
  } else {
    throw new Error('Invalid task index!');
  }
}

// Function to delete a task
function deleteTask(index) {
  const tasks = loadTasks();
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks(tasks);
  } else {
    throw new Error('Invalid task index!');
  }
}

// Function to display the tasks
function displayTasks() {
  const tasks = loadTasks();
  console.log('\n======= Tasks =======');
  if (tasks.length === 0) {
    console.log('No tasks found!');
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}

// Function to handle user input
function handleInput(input) {
  const args = input.split(' ');
  const action = args[0];


  switch (action) {
    case 'add':
      const task = args.slice(1).join(' ');
      addTask(task);
      console.log('Task added successfully!');
      break;
    case 'update':
      const index = parseInt(args[1], 10) - 1;
      const updatedTask = args.slice(2).join(' ');
      updateTask(index, updatedTask);
      console.log('Task updated successfully!');
      break;
    case 'delete':
      const deleteIndex = parseInt(args[1], 10) - 1;
      deleteTask(deleteIndex);
      console.log('Task deleted successfully!');
      break;
    case 'list':
      displayTasks();
      break;
    default:
      console.log('Invalid action. Please try again.');
  }
}

// Function to start the command-line interface
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt('Enter a action: ');
  rl.prompt();

  rl.on('line', (input) => {
    handleInput(input.trim());
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
  });
}

module.exports = {
  startCLI
};