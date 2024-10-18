window.todo = []
window.inprogress = []
window.completed = []

function clearCompleted(){
    completed=[];
    refreshCompletedItems();
    saveData();
}

function saveData(){
    localStorage.setItem('todo',JSON.stringify(todo));
    localStorage.setItem('inprogress',JSON.stringify(inprogress));
    localStorage.setItem('completed',JSON.stringify(completed));
}

function loadData(){
    if(localStorage.getItem('todo')) todo=JSON.parse(localStorage.getItem('todo'));
    if(localStorage.getItem('inprogress')) inprogress=JSON.parse(localStorage.getItem('inprogress'));
    if(localStorage.getItem('completed')) completed=JSON.parse(localStorage.getItem('completed'));

    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();

}
const moveToProgess = (outer,listName)=>{
    const task = outer.querySelector("p").innerText;
    console.log(task);

    if (listName=='todo') todo.splice(todo.indexOf(task),1);
    else completed.splice(completed.indexOf(task),1);

    inprogress.push(task);
    saveData();
    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();
};

const moveToCompleted = (outer)=>{
    const task = outer.querySelector("p").innerText;

    inprogress.splice(inprogress.indexOf(task),1);
    completed.push(task);

    saveData();
    refreshCompletedItems();
    refreshInProgressItems();
};

const moveToToDo = (outer)=>{
    const task = outer.querySelector("p").innerText;

    inprogress.splice(inprogress.indexOf(task),1);
    todo.push(task);

    saveData();
    refreshInProgressItems();
    refreshToDoItems();
};


// Refresh lists 

const refreshToDoItems = ()=>{
    const todoitem = document.querySelector("#todoList");
    todoitem.innerHTML = '';
    
    todo.forEach((item) => {

        const outer = document.createElement('li');

        outer.setAttribute('class',"listItem");

        const para = document.createElement('p');
        para.innerText = item;
        outer.appendChild(para);
        para.setAttribute('class','listText');

        const movButton = document.createElement('button');
        movButton.innerText=" > ";
        movButton.addEventListener('click',()=>{moveToProgess(outer,"todo")});
        outer.appendChild(movButton);
        movButton.setAttribute('class','listButton');

        todoitem.appendChild(outer);
    });
}

const refreshInProgressItems = ()=>{
    const todoitem = document.querySelector("#progressList");
    todoitem.innerHTML = '';
    
    inprogress.forEach((item) => {

        const outer = document.createElement('li');
        outer.setAttribute('class',"listItem");

        const prevButton = document.createElement('button');
        prevButton.innerText=" < ";
        prevButton.addEventListener('click',()=>{moveToToDo(outer)});
        prevButton.setAttribute('class','listButton');
        outer.appendChild(prevButton);

        const para = document.createElement('p');
        para.innerText = item;
        outer.appendChild(para);
        para.setAttribute('class','listText');

        const movButton = document.createElement('button');
        movButton.addEventListener('click',()=>{moveToCompleted(outer)});
        movButton.setAttribute('class','listButton');
        outer.appendChild(movButton);
        movButton.innerText=" > ";

        todoitem.appendChild(outer);
    });
};

const refreshCompletedItems = ()=>{
    const todoitem = document.querySelector("#completedList");
    todoitem.innerHTML = '';
    
    completed.forEach((item) => {

        const outer = document.createElement('li');
        outer.setAttribute('class',"listItem");

        const movButton = document.createElement('button');
        movButton.innerText=" < ";
        movButton.addEventListener('click',()=>{moveToProgess(outer,"completed")});
        outer.appendChild(movButton);
        movButton.setAttribute('class','listButton');

        const para = document.createElement('p');
        para.innerText = item;
        para.setAttribute('class','listText');
        outer.appendChild(para);

        todoitem.appendChild(outer);
    });
};

function addTask()
{
    const taskItem = document.querySelector("#task").value;
    
    todo.push(taskItem);
    document.querySelector("#task").value='';
    saveData();
    refreshToDoItems();
}

window.onload= function(){
    loadData();
};