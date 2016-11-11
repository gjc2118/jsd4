// Structure
// ------------------------------------------------
var form     = document.querySelector("form"),
    itemName = document.querySelector(".item-name"),
    itemDate = document.querySelector(".item-due-date"),
    list     = document.querySelector(".list");


// Setup
// ------------------------------------------------
var todoList = {
    "tasks": []
};

var ref = new Firebase('https://todo-list-6d904.firebaseio.com')

// Events
// ------------------------------------------------

document.addEventListener("DOMContentLoaded", getTodoList);
form.addEventListener("submit", addItem);


// Event Handlers
// ------------------------------------------------
function addItem(event) {
    event.preventDefault();

    // create JSON for new item
    var item = {
        name: itemName.value,
        date: itemDate.value,
        completed: false
    };

    createTodoItem(item);

    todoList.tasks.push(item);
    saveTodoList();

    form.reset();
};

function itemClicked(event) {

    var checkbox = event.target;

    todoList.tasks.forEach(updateTaskCompletedProperty);

    function updateTaskCompletedProperty(item) {
        // the span comes after the checkbox, so you can
        // use "nextSibling" (method on an Element object)"
        // to get the span element after the checkbox
        var span = checkbox.nextSibling;

        // check if this is the item in the array matching the 
        // one that was clicked by comparing the name text
        if (span.textContent === item.name) {

            // if the item in the array was found,
            // set its "completed" property in the JSON 
            // equal to the checked state of the checkbox 
            // to keep the JSON in sync with the UI
            // See the "checked" property:
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
            item.completed = checkbox.checked;
        }
    }

    saveTodoList();
};


// Update page functions
// ------------------------------------------------
function createTodoItem(item) {    
    // Step 1: create new html
    // ----------------------------------------------------------------
    var li       = document.createElement("li"),
        label    = document.createElement("label"),
        checkbox = document.createElement("input"),
        span     = document.createElement("span");


    // Step 2: add event listeners, attributes, and content to new html
    // ----------------------------------------------------------------
    span.textContent = item.name;
    checkbox.setAttribute("type", "checkbox");
    if (item.completed) {
        checkbox.setAttribute("checked", true);
    }

    // make each item clickable to update the "completed" property
    checkbox.addEventListener("click", itemClicked);


    // Step 3: add new html to DOM
    // ----------------------------------------------------------------
    li.appendChild(label);
    label.appendChild(checkbox);
    label.appendChild(span);

    // Optionally, add a due date if one was set
    if (item.date !== undefined && item.date.length > 0) {
        var time = document.createElement("time");
        time.textContent = "(" + item.date + ")";
        li.appendChild(time);
    }

    list.appendChild(li);
};

// Local Storage functions
// ------------------------------------------------
function getTodoList() {
    ref.on("value",dataChange);
};

function dataChange(snapshot){
    var value = snapshot.val();
    if (value === null){
        return;
    }
    list.innerHTML = "";
    value.tasks.forEach(createTodoItem);
};

function saveTodoList() {
    console.log("touch!");
    ref.set(todoList);
};
