let toDoList = document.querySelector('ul')
let listItems = toDoList.children
let addItemForm = document.querySelector('form')
let newItemInput = addItemForm.querySelector('input')
let checkboxAll = document.querySelector('.check-all-checkbox')

let todos = []

if (localStorage.getItem('todolist')) {
    todos = JSON.parse(localStorage.getItem('todolist'))
    renderItems()
}

function createNewElement(itemText) {

    let listItem = document.createElement('li')
    listItem.classList.add('item')
    let listItemLabel = document.createElement('label')

    let listItemCheckbox = document.createElement('input')
    listItemCheckbox.type = 'checkbox'
    listItemCheckbox.classList.add('item-check')

    let listItemSpan = document.createElement('span')
    listItemSpan.textContent = itemText
    listItemSpan.classList.add('item-text');

    let editButton = document.createElement('span')
    editButton.innerHTML = '&#110;'
    editButton.classList.add('edit-button')

    let deleteButton = document.createElement('span')
    deleteButton.innerHTML = '&#111;'
    deleteButton.classList.add('delete-button')

    listItem.appendChild(listItemLabel)
    listItemLabel.appendChild(listItemCheckbox)
    listItemLabel.appendChild(listItemSpan)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    return listItem
}

function renderItems() {

    toDoList.innerHTML = ''
    localStorage.setItem('todolist', JSON.stringify(todos))

    for (let key in todos) {

        let element = createNewElement(todos[key].item)
        let textContent = element.querySelector('span')
        let checkbox = element.querySelector('input')
        let deleteButton = element.querySelectorAll('span')[2]
        let editButton = element.querySelector('.edit-button')

        if (todos[key].state === 1) {
            checkbox.checked = true
            textContent.style.textDecoration = 'line-through'
        } else {
            checkbox.checked = false
            textContent.style.textDecoration = 'none'
        }

        editItems(todos[key], checkbox, deleteButton, editButton, textContent, element)
        toDoList.appendChild(element)

    }

}


function editItems(item, check, del, edit, text, el) {

    function checkItem() {

        if (check.checked) this.state = 1
        else this.state = 0

        renderItems()
    }

    function deleteItem() {
        todos = todos.filter(s => s !== this)
        renderItems()
    }


    check.addEventListener('change', checkItem.bind(item))
    del.addEventListener('click', deleteItem.bind(item))
    edit.addEventListener('click', function() {

        el.innerHTML = `<input class="tmp-input" type="text" value="${text.textContent}" maxlength="25"><i class="tmp-edit">&#217;</i>`
        let acceptChange = el.querySelector('i')

        acceptChange.addEventListener('click', function() {
            if(el.querySelector('.item > input').value.length !== 0) {
                item.item = el.querySelector('.item > input').value
                renderItems()
            } else renderItems()
        })

        addEventListener('keydown', function(evt) {
            if(evt.code === 'Enter') {
                if(el.querySelector('.item > input').value.length !== 0) {
                    item.item = el.querySelector('.item > input').value
                    renderItems()
                } else renderItems()
            }
        })
    })
}

checkboxAll.addEventListener('click', function () {
    for (let i = 0; i < todos.length; i++) {
        if (checkboxAll.checked) todos[i].state = 1
        else todos[i].state = 0
    }
    renderItems()
})



addItemForm.addEventListener('submit', function (evt) {

    evt.preventDefault()

    let ListItemObject = {
        'id': idObject(),
        'item': newItemInput.value,
        'state': 0
    }

    function idObject() {
        if (todos.length !== 0) return this.id = todos[todos.length - 1].id + 1
        else return this.id = 0
    }

    todos.push(ListItemObject)
    renderItems()
    newItemInput.value = ''

})