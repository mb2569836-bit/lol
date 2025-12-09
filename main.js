const addButton = document.querySelector('.addButton')
const myInput = document.querySelector('.myInput')
const taskList = document.querySelector('#taskList')


let myTasks = JSON.parse(localStorage.getItem('myTasks')) || []

const saveTasks = () => {
  localStorage.setItem('myTasks', JSON.stringify(myTasks))
}

const renderTasks = () => {
  const newChildrens = []

  myTasks.forEach((el, index) => {
    const myTaskWrapper = document.createElement('li')
    const myTaskName = document.createElement('div')
    myTaskName.textContent = el

    const editButton = document.createElement('button')
    editButton.textContent = 'Редактироват🧠'
    editButton.addEventListener('click', () => {
      const newTaskName = prompt('Измените свою заметку:', el)
      if (newTaskName !== null && newTaskName.trim() !== '') {
        myTasks[index] = newTaskName
        saveTasks()
        renderTasks()
      }
    })

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Удалит..☠️'
    deleteButton.addEventListener('click', () => {
      myTasks.splice(index, 1)
      saveTasks()
      renderTasks()
    })

    myTaskWrapper.appendChild(myTaskName)
    myTaskWrapper.appendChild(editButton)
    myTaskWrapper.appendChild(deleteButton)
    newChildrens.push(myTaskWrapper)
  })

  taskList.replaceChildren(...newChildrens)
}

addButton.addEventListener('click', () => {
  const taskName = myInput.value.trim()
  if (taskName !== '') {
    myTasks.push(taskName)
    saveTasks()
    renderTasks()
    myInput.value = ''
  }
})

renderTasks()
