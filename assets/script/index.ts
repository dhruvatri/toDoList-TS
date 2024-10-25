let todo : string [] = []
let inprogress : string [] = []
let completed : string []= []

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
    const todoGet = (localStorage.getItem('todo'));
    if(todoGet) todo=JSON.parse(todoGet);

    const inProgressGet = localStorage.getItem('inprogress');
    if(inProgressGet) inprogress = JSON.parse(inProgressGet);
    
    const completedGet = localStorage.getItem('completed');
    if(completedGet) completed=JSON.parse(completedGet);

    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();

}
const moveToProgess = (outer : HTMLElement,listName : string)=>{
    const task : string | undefined= outer.querySelector("p")?.innerText;
    console.log(task);

    if (task !==undefined){

        if (listName=='todo') todo?.splice(todo.indexOf(task),1);
        else completed.splice(completed.indexOf(task),1);

        inprogress.push(task);
    }
    saveData();
    refreshToDoItems();
    refreshInProgressItems();
    refreshCompletedItems();
};

const moveToCompleted = (outer: HTMLElement)=>{
    const task : string | undefined= outer.querySelector("p")?.innerText;

    if (task!==undefined)
    {
        inprogress.splice(inprogress.indexOf(task),1);
        completed.push(task);
    }
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
    const todoitem : HTMLElement | null = document.querySelector("#todoList");
    if (todoitem!==null) todoitem.innerHTML = '';
    
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

        if (todoitem!==null)todoitem.appendChild(outer);
    });
}

const refreshInProgressItems = ()=>{
    const todoitem : HTMLElement | null = document.querySelector("#progressList");
    
    if (todoitem!==null) todoitem.innerHTML = '';
    
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

        if (todoitem!==null) todoitem.appendChild(outer);
    });
};

const refreshCompletedItems = ()=>{
    const todoitem : HTMLElement | null = document.querySelector("#completedList");
    if (todoitem!==null )todoitem.innerHTML = '';
    
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

        if(todoitem!==null) todoitem.appendChild(outer);
    });
};

function addTask()
{
    const taskItem : string = (document.querySelector("#task") as HTMLInputElement)?.value || '';
    
    todo.push(taskItem);
    const taskInput : HTMLInputElement | null = (document.querySelector("#task") );
    if (taskInput!==null) taskInput.value='';
    saveData();
    refreshToDoItems();
}

window.onload= function(){
    loadData();
};


    var modal = document.getElementById("myModal") as HTMLElement;

    // Get the button that opens the modal
    var btn = document.querySelector("#clearCompleted") as HTMLButtonElement ;
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;

    var deleteBtn = document.querySelector('#deleteButton') as HTMLButtonElement;

    deleteBtn.onclick = function(): void{
        clearCompleted();
        modal.style.display = "none";
    }
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
