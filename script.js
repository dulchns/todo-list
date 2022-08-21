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

function checkItem() {
  todos = todos.map(s => {
    if(s === this) {
      s.state = this.state === 0 ? 1 : 0
    }

    return s
  })

  renderItems()
}

function deleteItem() {
  todos = todos.filter(s => s !== this)
  renderItems()
}

function editItem() {
  todos = todos.map(s => {
    if(s === this) {
      s.isEditing = true
    }

    return s
  })

  renderItems()
}

function editItemComplete() {
  console.log('++ 2 ++')
}


function createNewElement(item) {
    const listItem = document.createElement('li')
    listItem.classList.add('item')
    let listItemLabel = document.createElement('label')

    const listItemCheckbox = document.createElement('input')
    listItemCheckbox.type = 'checkbox'
    listItemCheckbox.classList.add('item-check')

    const listItemSpan = document.createElement('span')
    listItemSpan.textContent = item.text
    listItemSpan.classList.add('item-text')

    const editButton = document.createElement('span')
    editButton.innerHTML = '&#110;'
    editButton.classList.add('edit-button')

    const deleteButton = document.createElement('span')
    deleteButton.innerHTML = '&#111;'
    deleteButton.classList.add('delete-button')

    listItem.appendChild(listItemLabel)
    listItemLabel.appendChild(listItemCheckbox)
    listItemLabel.appendChild(listItemSpan)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    return {
      textContent: listItemSpan,
      checkbox: listItemCheckbox,
      deleteButton,
      editButton,
      element: listItem
    }
}

function renderItems() {
    toDoList.innerHTML = ''
    localStorage.setItem('todolist', JSON.stringify(todos))

    for (let key in todos) {
        const {
          textContent,
          checkbox,
          deleteButton,
          editButton,
          element
        } = createNewElement(todos[key])

        if (todos[key].state === 1) {
            checkbox.checked = true
            textContent.style.textDecoration = 'line-through'
        } else {
            checkbox.checked = false
            textContent.style.textDecoration = 'none'
        }

        checkbox.addEventListener('change', checkItem.bind(todos[key]))
        deleteButton.addEventListener('click', deleteItem.bind(todos[key]))
        editButton.addEventListener('click', editItem.bind(todos[key]))

        toDoList.appendChild(element)

    }

    for(let key in todos) {
        if(todos[key].state === 1) checkboxAll.checked = true
        else {
            checkboxAll.checked = false
            break
        }
    }

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