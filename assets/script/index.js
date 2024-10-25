var todo = [];
var inprogress = [];
var completed = [];
function clearCompleted() {
    completed = [];
    refreshCompletedItems();
    saveData();
}
function saveData() {
    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('inprogress', JSON.stringify(inprogress));
    localStorage.setItem('completed', JSON.stringify(completed));
}
function loadData() {
    var todoGet = (localStorage.getItem('todo'));
    if (todoGet)
        todo = JSON.parse(todoGet);
    var inProgressGet = localStorage.getItem('inprogress');
    if (inProgressGet)
        inprogress = JSON.parse(inProgressGet);
    var completedGet = localStorage.getItem('completed');
    if (completedGet)
        completed = JSON.parse(completedGet);
    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();
}
var moveToProgess = function (outer, listName) {
    var _a;
    var task = (_a = outer.querySelector("p")) === null || _a === void 0 ? void 0 : _a.innerText;
    console.log(task);
    if (task !== undefined) {
        if (listName == 'todo')
            todo === null || todo === void 0 ? void 0 : todo.splice(todo.indexOf(task), 1);
        else
            completed.splice(completed.indexOf(task), 1);
        inprogress.push(task);
    }
    saveData();
    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();
};
var moveToCompleted = function (outer) {
    var _a;
    var task = (_a = outer.querySelector("p")) === null || _a === void 0 ? void 0 : _a.innerText;
    if (task !== undefined) {
        inprogress.splice(inprogress.indexOf(task), 1);
        completed.push(task);
    }
    saveData();
    refreshCompletedItems();
    refreshInProgressItems();
};
var moveToToDo = function (outer) {
    var task = outer.querySelector("p").innerText;
    inprogress.splice(inprogress.indexOf(task), 1);
    todo.push(task);
    saveData();
    refreshInProgressItems();
    refreshToDoItems();
};
// Refresh lists 
var refreshToDoItems = function () {
    var todoitem = document.querySelector("#todoList");
    if (todoitem !== null)
        todoitem.innerHTML = '';
    todo.forEach(function (item) {
        var outer = document.createElement('li');
        outer.setAttribute('class', "listItem");
        var para = document.createElement('p');
        para.innerText = item;
        outer.appendChild(para);
        para.setAttribute('class', 'listText');
        var movButton = document.createElement('button');
        movButton.innerText = " > ";
        movButton.addEventListener('click', function () { moveToProgess(outer, "todo"); });
        outer.appendChild(movButton);
        movButton.setAttribute('class', 'listButton');
        if (todoitem !== null)
            todoitem.appendChild(outer);
    });
};
var refreshInProgressItems = function () {
    var todoitem = document.querySelector("#progressList");
    if (todoitem !== null)
        todoitem.innerHTML = '';
    inprogress.forEach(function (item) {
        var outer = document.createElement('li');
        outer.setAttribute('class', "listItem");
        var prevButton = document.createElement('button');
        prevButton.innerText = " < ";
        prevButton.addEventListener('click', function () { moveToToDo(outer); });
        prevButton.setAttribute('class', 'listButton');
        outer.appendChild(prevButton);
        var para = document.createElement('p');
        para.innerText = item;
        outer.appendChild(para);
        para.setAttribute('class', 'listText');
        var movButton = document.createElement('button');
        movButton.addEventListener('click', function () { moveToCompleted(outer); });
        movButton.setAttribute('class', 'listButton');
        outer.appendChild(movButton);
        movButton.innerText = " > ";
        if (todoitem !== null)
            todoitem.appendChild(outer);
    });
};
var refreshCompletedItems = function () {
    var todoitem = document.querySelector("#completedList");
    if (todoitem !== null)
        todoitem.innerHTML = '';
    completed.forEach(function (item) {
        var outer = document.createElement('li');
        outer.setAttribute('class', "listItem");
        var movButton = document.createElement('button');
        movButton.innerText = " < ";
        movButton.addEventListener('click', function () { moveToProgess(outer, "completed"); });
        outer.appendChild(movButton);
        movButton.setAttribute('class', 'listButton');
        var para = document.createElement('p');
        para.innerText = item;
        para.setAttribute('class', 'listText');
        outer.appendChild(para);
        if (todoitem !== null)
            todoitem.appendChild(outer);
    });
};
function addTask() {
    var _a;
    var taskItem = ((_a = document.querySelector("#task")) === null || _a === void 0 ? void 0 : _a.value) || '';
    todo.push(taskItem);
    var taskInput = (document.querySelector("#task"));
    if (taskInput !== null)
        taskInput.value = '';
    saveData();
    refreshToDoItems();
}
window.onload = function () {
    loadData();
};
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.querySelector("#clearCompleted");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var deleteBtn = document.querySelector('#deleteButton');
deleteBtn.onclick = function () {
    clearCompleted();
    modal.style.display = "none";
};
// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
