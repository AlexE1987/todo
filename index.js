// Переменные для работы с DOM
const input = document.getElementById('input')
const buttonAdd = document.getElementById('buttonAdd')
const buttonClear = document.getElementById('buttonClear') 
const ul = document.getElementById('ul')

// Пустой массив-список, в который будем добавлять задачи
let todoList = []

if (localStorage.getItem('todo')) { // Если есть сохраненные данные в localStorage возвращаем их в массив todoList
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayTodo()
}

// Обработка кнопки "Добавить" по клику мыши и input при нажатии "Enter"
    buttonAdd.addEventListener('click', todoListPush)
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            ul.innerHTML = ''//Используем чтобы убирать дубликаты элементов массива из списка
            inputValue = input.value
            todoList.push(inputValue)
            displayTodo()
            localStorage.setItem('todo', JSON.stringify(todoList))
            console.log(todoList)
        }
    })

// Передача значений input в массив todoList
    function todoListPush() {
    ul.innerHTML = ''//Используем чтобы убирать дубликаты элементов массива из списка
    inputValue = input.value
    todoList.push(inputValue)
    displayTodo()
    localStorage.setItem('todo', JSON.stringify(todoList))
    console.log(todoList)
}


// Функция для перебора массива todoList. Создаются/отображаются новые элементы li,buttonRemove. В них добавляются элеметы массива.
function displayTodo() {
    for (let i in todoList) {
        let li = document.createElement('li')
        let buttonRemove = document.createElement('button')
        buttonRemove.setAttribute('class', 'buttonRemove')
        li.innerHTML = todoList[i]
        buttonRemove.innerText = 'удалить'
        li.append(buttonRemove)
        ul.append(li)
                        
        // Обработчик событий для удаления элементов массива todoList и элементов списка, при нажатии кнопки "удалить" 
        buttonRemove.addEventListener('click', e => {
            const btn = e.target.closest('.buttonRemove')
            btn.parentElement.remove()            

            let index = todoList.indexOf(buttonRemove)
            todoList.splice(index, 1)
            localStorage.setItem('todo', JSON.stringify(todoList))
            console.log(todoList);
        })
    }    
}

// Обработка кнопки "Очистить список". Обнуляем массив todoList
buttonClear.addEventListener('click', () => {
    ul.innerHTML = ''//Используем для корректной очистки списка
    todoList.length = 0
    localStorage.setItem('todo', JSON.stringify(todoList))
    console.log(todoList)
})


