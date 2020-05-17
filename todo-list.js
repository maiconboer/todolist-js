let listElement = document.querySelector('.app ul')
let inputElement = document.querySelector('.app input')
let buttonElement = document.querySelector('.app button')
let arrayTodos = []
let initialTodos = JSON.parse(localStorage.getItem('list_todos')) || []

if (initialTodos.length > 0) {
    for (let todo of initialTodos) {
        addTodo(todo)
    }
}

function addTodo(task) {
    if (task === '') {
        window.alert('Entrada inválida! Dê um nome a tarefa.')
    } else {
        const divButtonsTask = document.createElement('div')
        const li = document.createElement('li')
        const createLinkRemove = document.createElement('a')
        const createLinkEdit = document.createElement('a')
    
        task = task.toUpperCase()
        arrayTodos.push(task)
        li.classList.add('list-item')
        li.innerHTML = `<p>${task}</p>`

        const sizeList = document.querySelectorAll('p').length - 1;
        li.setAttribute('index', sizeList)

        setAttributeButton(createLinkRemove, 'href', '#', 'onClick', 'deleteTodo(event)')
        setAttributeButton(createLinkEdit, 'href', '#', 'onClick', 'editTodo(event)')

        divButtonsTask.appendChild(createLinkEdit)
        divButtonsTask.appendChild(createLinkRemove)
        li.appendChild(divButtonsTask)
        listElement.appendChild(li)
        saveToStorage()
    }
}

buttonElement.addEventListener('click', () => {
    addTodo(inputElement.value)
    inputElement.value = ''
})

function deleteTodo(event) {
    event.preventDefault()
    let position = verifyPosition(event)
    event.target.parentNode.parentNode.remove()
    console.log(event.target.parentNode.parentNode);
    
    arrayTodos.splice(position, 1)
    window.location.reload(true)
    saveToStorage()
}

function editTodo(event) {
    event.preventDefault()
    let position = verifyPosition(event)
    let newValue = prompt('Digite o novo valor do todo...')

    if (!newValue) {
        window.alert('Entrada inválida! Dê um nome a tarefa.')
        editTodo(event)
    } else {
        event.target.parentNode.previousElementSibling.innerHTML = newValue.toUpperCase()
        arrayTodos[position] = newValue.toUpperCase();
        saveToStorage()
    }
}

function setAttributeButton(button, attribute1, value1, attribute2, value2) {
    button.setAttribute(attribute1, value1)
    button.setAttribute(attribute2, value2)
}

function verifyPosition(event) {
    let positionElement = event.target.parentNode.parentNode
    let position = Number(positionElement.getAttribute('index'))
    return position
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(arrayTodos))
}


