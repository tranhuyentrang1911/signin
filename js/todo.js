var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todos = document.querySelector('.todos');
form.onsubmit = function(e) {
    e.preventDefault();
    let value = input.value.trim();
    if (value) {
        addTodoElement({
            text: value,
            status: ""
        });
    }
    input.value = "";
    input.focus();
}

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function addTodoElement(todo) {
    var li = document.createElement('li');
    li.innerHTML = `
                    <span>${todo.text}</span>
                    <div>
                        <i class="fa-solid fa-check check"></i>
                        <i class="fa-solid fa-trash-can delete"></i>
                    </div>
                
    `;
    if (todo.status === "finished") {
        li.setAttribute("class", "finished");
    }
    li.querySelector(".delete").onclick = function() {
        let parent = getParent(this, "li");
        parent.remove();
        saveTodoList();
    }
    li.querySelector('.check').onclick = function() {
        let parent = getParent(this, "li");
        parent.classList.toggle('finished');
        input.focus();
        saveTodoList();

    }
    todos.appendChild(li);
    saveTodoList();

}

function saveTodoList() {
    let todoList = document.querySelectorAll('li');
    let todoListArray = Array.from(todoList);

    let todoListStorage = todoListArray.map(

        item => {
            let text = item.querySelector('span').innerText;
            // console.log(text);
            let status = item.getAttribute('class');
            // console.log(status);
            return {
                text,
                status
            }
        }

    );
    // console.log(todoListStorage)
    localStorage.setItem('todolist', JSON.stringify(todoListStorage));

}

function todoInit() {
    if (localStorage.getItem('todolist')) {
        let data = JSON.parse(localStorage.getItem('todolist'));
        data.forEach(element => {
            addTodoElement(element);
        });
    }
}
todoInit();