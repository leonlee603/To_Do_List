var tasks = []; // Array for storing all tasks.

window.onload = function() {
    // Check if user has any tasks stored in the local storage before.
    if (JSON.parse(localStorage.getItem("tasks_db")) != null) {
        tasks = JSON.parse(localStorage.getItem("tasks_db"));
        renderTask();
    }
    getDate(); // Display the date.
    updateCounter() // Display the counter for task.
    document.getElementById("taskDescription").focus();
}

// Adding new task.
function addTask() {
    var input = document.querySelector("#taskDescription").value.trim(); // Make sure the user does not input empty space.
    if (input.length > 0) {
        // Add the task to the task list if it is a valid input and save it to local storage.
        tasks.push(input);
        localStorage.setItem("tasks_db", JSON.stringify(tasks));
        renderTask();
        document.querySelector("#taskDescription").setAttribute("placeholder", "Add a task...");
    } else {
        // Alert user if user enter an empty space.
        document.querySelector("#taskDescription").setAttribute("placeholder", "Please enter something...");
    }
    updateCounter()
}

// Render the task on taskBody.
function renderTask() {
    var listitems = document.querySelector(".taskBody");
    // Remove the old list of tasks before render a new one.
    listitems.innerHTML = "";
    // Display the tasks list by for loop. Use the counter as index for a specify task list item.
    for (let i = 0; i < tasks.length; i++) {
        listitems.innerHTML += `<li class="element" id="${i}">${tasks[i]}<span class="delete" onclick="del(${i})"><i class="fa fa-trash"></i></span><span class="check" onclick="completedTask(${i})"><i class="fa fa-check"></i></span></li>`
    }
}

// Adding line through on completed task.
function completedTask(index) {
    if (tasks[index].includes("<del>")) {
        tasks[index] = tasks[index].replace("<del>", "");
        tasks[index] = tasks[index].replace("</del>", "");
    } else {
        tasks[index] = "<del>" + tasks[index] + "</del>";
    }
    localStorage.setItem("tasks_db", JSON.stringify(tasks)); // Update the local storage.
    renderTask();
    updateCounter()
    document.getElementById("taskDescription").focus();
} 

// Remove a task.
function del(index) {
    tasks.splice(index, 1); // Remove the task which the indexed one is clicked.
    localStorage.setItem("tasks_db", JSON.stringify(tasks)); // Update the local storage.
    renderTask();
    updateCounter()
    document.getElementById("taskDescription").focus();
} 

// Function to update the total number of incomplete tasks.
function updateCounter() {
    var numOfTask = 0
    // Check how many task are incomplete.
    for (let i = 0; i < tasks.length; i ++) {
        if (tasks[i].includes("<del>")) {
            numOfTask += 0;
        } else {
            numOfTask += 1;
        }
    }
    if (numOfTask > 1) {
        document.getElementById("info").innerHTML = "Number of tasks: ";
    } else {
        document.getElementById("info").innerHTML = "Number of task: ";
        
    }
    document.getElementById("counter").innerHTML = numOfTask;
}

// Display the date on task header.
function getDate () {
    var dateObj = new Date();
    var day = dateObj.getDay();
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    dayList = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    document.getElementById("todaysDate").innerHTML = dayList[day] + ", " + date + " " + monthList[month];
}

// Event hander for button.
var button = document.getElementById("add");
button.addEventListener("click", function(e){
    e.preventDefault();
    addTask();
    document.getElementById("taskDescription").value = '';
    document.getElementById("taskDescription").focus();
    }
);
