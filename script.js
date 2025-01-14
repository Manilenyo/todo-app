const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-select");

function addTask(){
    if(inputBox.value ===''){
        alert ("Write Something bitch")
    }
    else{
        let li = document.createElement("li"); 
        let priorityClass = prioritySelect.value === "Urgent" ? "urgent" : "not-urgent";
        li.innerHTML = `
            <span class="task-text">${inputBox.value}</span>
            <span class="task-priority ${priorityClass}">(${prioritySelect.value})</span> 
        `; // Prioty Select (Urgent and Not-Urgent)
        listContainer.appendChild(li);

        // Add Delete Icon
        let span = document.createElement('span'); // create span when a task is added
        span.innerHTML = '<img src="images/trash.png"/ alt="Delete">'; 
        li.appendChild(span);

        // Add to the top if urgent, otherwise to the bottom
        if (prioritySelect.value === "Urgent") {
            listContainer.insertBefore(li, listContainer.firstChild);
        } else {
            listContainer.appendChild(li);
        }
    }
    inputBox.value = "";
    prioritySelect.value = "Urgent";
    saveData();

}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const task = e.target;
        task.classList.toggle("checked"); // Toggle the "checked" class

        const prioritySpan = task.querySelector(".task-priority");
        const dateSpan = task.querySelector(".completion-date");

        if (task.classList.contains("checked")) {
            // Task is checked: Hide priority and add a completion date
            if (prioritySpan) {
                prioritySpan.style.display = "none"; // Hide the priority span
            }
            if (!dateSpan) {
                const newDateSpan = document.createElement("span");
                newDateSpan.className = "completion-date";
                newDateSpan.textContent = ` ${new Date().toLocaleString()}`;
                task.appendChild(newDateSpan); // Add the completion date span
            }
        } else {
            // Task is unchecked: Show priority and remove the completion date
            if (prioritySpan) {
                prioritySpan.style.display = "inline"; // Show the priority span
            }
            if (dateSpan) {
                dateSpan.remove(); // Remove the completion date span
            }
        }
        saveData();
    }
    else if (e.target.tagName === "IMG" && e.target.alt === "Delete") {
        const confirmDelete = confirm("Are you sure to delete this task?"); // Prompt to confirm deletion
        if (confirmDelete) {
        e.target.closest("li").remove(); // Remove the task on delete
        saveData();
        }
    }
    // Edit task when clicking on task text (only if not checked)
    else if (e.target.classList.contains("task-text")) {
        const task = e.target.closest("li");
        if (task.classList.contains("checked")) {
            return;
        }
        const newTaskText = prompt("Edit your task:", e.target.textContent); // Prompt user for new text
        if (newTaskText !== null && newTaskText.trim() !== "") {
            e.target.textContent = newTaskText; // Update the task text
            saveData();
        }
    } 
}, false);

    let hideCompleted =false; // filter state

    document.getElementById("filter-toggle").addEventListener("click", function () {
        hideCompleted = !hideCompleted; // Toggle the state 
        this.textContent = hideCompleted ? "Show Completed" : "Hide Completed"; // Update Button Text
        applyFilter(); // Apply the filter
    });

    function applyFilter() {
        const task =listContainer.querySelectorAll("LI")
        task.forEach(task => {
            if (hideCompleted && task.classList.contains("checked")) {
                task.style.display = "none"; // Hide completed task 
            } else {
                task.style.display = ""; // show all tasks
            }
        });
    }

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML); // Saves the data locally
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data"); // Loads the data locally
}
showTask();