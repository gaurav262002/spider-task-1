//Selectors
const todoinput=document.querySelector(".todo-input");
const addBtn=document.querySelector(".addBtn");
const todolist=document.querySelector(".todo-list");
const date = document.getElementById("calender");
const todoDiv = document.createElement("div");
var my_date;


//Event listners
document.addEventListener("DOMContentLoaded", getTodos)
addBtn.addEventListener("click",addTodo);    
todolist.addEventListener("click",deletedone);
date.addEventListener("click",day);

//functions 

function addTodo(event){
    //prevent the default actions of submit
    event.preventDefault();
//creating todo div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todoDiv");
//creating an li tag
const newTodo = document.createElement('li');
newTodo.classList.add("newTodo")
newTodo.innerHTML=todoinput.value;
todoDiv.appendChild(newTodo);
// add todo to local storage
saveLocalTodos(todoinput.value);
//done button
const doneBtn=document.createElement('button');
doneBtn.classList.add("doneBtn");
doneBtn.innerHTML="Done";
todoDiv.appendChild(doneBtn);
//Delete button
const deleteBtn=document.createElement('button');
deleteBtn.classList.add("deleteBtn");
deleteBtn.innerHTML="Delete";
todoDiv.appendChild(deleteBtn);
//append the div to list
todolist.appendChild(todoDiv)
// clear input value
todoinput.value="";
}

function deletedone(e){
    const item = e.target;
    
    if(item.classList[0]==="deleteBtn"){
        removeLocalTodos(item.parentElement)
        item.parentElement.remove();
        
    }
    //done functionality
     if(item.classList[0]==="doneBtn"){
        const todo = document.querySelector(".newTodo");
        todo.classList.toggle('completed');
     }
  
}

function day(e){
     const f=e.target.innerHTML
     if(isNaN(f)){
       alert("Click on valid date")
     }else{
      todoinput.value= e.target.innerHTML+" June: "
      todoinput.focus();
     }

}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    todos.sort();
  }


function getTodos() {
  setTimeout(() => {
    alert("click on the date to add todos")
  }, 1000);
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
 
  todos.forEach(function(todo){
    //creating todo div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todoDiv");
//creating an li tag
const newTodo = document.createElement('li');
newTodo.classList.add("newTodo")
newTodo.innerHTML=todo;
todoDiv.appendChild(newTodo);
//done button
const doneBtn=document.createElement('button');
doneBtn.classList.add("doneBtn");
doneBtn.innerHTML="Done";
todoDiv.appendChild(doneBtn);
//Delete button
const deleteBtn=document.createElement('button');
deleteBtn.classList.add("deleteBtn");
deleteBtn.innerHTML="Delete";
todoDiv.appendChild(deleteBtn);
//append the div to list
todolist.appendChild(todoDiv);
    
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}