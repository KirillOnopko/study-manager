// -- // -- // СНИЗУ LOG OUT

const logoutButton = document.querySelector("#logout-button")

logoutButton.addEventListener("click", async (e) => {
    e.preventDefault()

    const response = await fetch("/account/logout", {
        method: "POST"
    })

    if (!response.ok) {
        alert("Something went wrong")
    } else {
        window.location.href = "/login"
    }
})

// -- // -- // СНИЗУ THEME SWITCH

const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>`
const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`

const switchThemeButton = document.querySelector("#switch-theme-button")
const body = document.querySelector("body")

if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light")
}

function applyTheme() {
    const theme = localStorage.getItem("theme")

    if (theme === "dark") {
        body.classList.remove("light")
        body.classList.add("dark")
        switchThemeButton.innerHTML = sun
    } else {
        body.classList.remove("dark")
        body.classList.add("light")
        switchThemeButton.innerHTML = moon
    }
}

applyTheme()

switchThemeButton.addEventListener("click", (event) => {
    const theme = localStorage.getItem("theme")

    if (theme === "light") {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "light")
    }
    
    applyTheme()
}) 

// СНИЗУ ЛОГИКА APP CONTENT

const subjectFilter = document.querySelector("#subject-filter")
const tasksNumber = document.querySelector("#tasks-number")
const allTasks = document.querySelector("#all-tasks-main")
const createTaskForm = document.querySelector("#create-task-form")
const addTaskButton = document.querySelector("#new-task-button")

async function getSubjectsData() {
    const response = await fetch("/api/subjects")

    if (!response.ok) {
        alert("Some problem occured")
        return
    }

    const data = await response.json()

    return data
}

function setSubjects(data) {
    let subjectsString = `
        <option value="all">All</option>
        <option value="general">General</option>
    `

    for (let subject of data.subjects) {
        subjectsString += `
            <option value="${subject.title}">
                ${subject.title}
            </option>
        `
    }

    subjectFilter.innerHTML = subjectsString
}

async function getTasksData() {
    const response = await fetch("/api/tasks")

    if (!response.ok) {
        alert("Error")
        return
    }

    return await response.json()
}

function setTasksNumber(data) {
    const number = Number(data.number)

    tasksNumber.textContent = number

    if (number === 1) {
        const tasksWord = document.querySelector("#tasks-word")
        tasksWord.textContent = "task"
    }
}

function setTasks(tasksData, subjectsData) {
    // Установка всех заданий👇
    let tasksString = ""

    for (let task of tasksData.tasks) {
        const deadline = task.deadline
            ? new Date(task.deadline).toLocaleDateString()
            : "No Deadline"

        const subject = task.subject === null
            ? "General"
            : task.subject

        const status = task.status === "in_progress"
            ? "In Progress"
            : task.status[0].toUpperCase() + task.status.slice(1)

        const description = task.description === null || task.description === ""
            ? "No Description" 
            : task.description

        tasksString += `
            <div class="task" data-task-id="${task.id}">

                <div class="task-menu unvisible">
                    <button class="task-menu-cross">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <button class="task-menu-button update-task">Update</button>
                    <button class="task-menu-button delete-task">Delete</button>
                </div>

                <div>
                    <div class="title-and-edit">
                        <p class="title">${task.title}</p>
                        <button class="edit-button">⋮</button>
                    </div>
                    <div class="description-and-subject">
                        <p class="description">${description}</p>
                        <p class="subject">${subject}</p>
                    </div>
                </div>

                <div class="status-and-deadline">
                    <p class="status">${status} · ${task.importance}</p>
                    <p class="date">${deadline}</p>
                </div>

            </div>
        `
    }

    allTasks.innerHTML = tasksString

    // Логика для edit-кнопок👇

    const editButtons = document.querySelectorAll(".edit-button")

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            const task = button.closest(".task")
            const menu = task.querySelector(".task-menu")

            task.classList.add("darkened")
            menu.classList.remove("unvisible")
        })
    })

    // Логика для закрытия edit-menu 👇

    const closeEditButtons = document.querySelectorAll(".task-menu-cross")

    closeEditButtons.forEach(button => {
        button.addEventListener("click", () => {
            const task = button.closest(".task")
            const menu = task.querySelector(".task-menu")

            task.classList.remove("darkened")
            menu.classList.add("unvisible")
        })
    })

    // Логика для Delete Task 👇

    const deleteButtons = document.querySelectorAll(".delete-task")

    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault()

            const task = button.closest(".task")
            const taskId = task.dataset.taskId

            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                alert(response.statusText)
            } else {
                window.location.href = "/tasks"
            }
        })
    })

    // Логика для Update Task 👇

    const updateButtons = document.querySelectorAll(".update-task")

    updateButtons.forEach(updateButton => {
        updateButton.addEventListener("click", event => {
            event.preventDefault()

            const task = updateButton.closest(".task")

            createTaskForm.innerHTML = `
                <form id="update-task-form">

                    <h1>Update New Task</h1>

                    <div id="create-task-data-container">

                        <div class="create-task-container">
                            <label for="create-task-title">Title</label>
                            <input type="text" id="create-task-title" name="title" maxlength="20">
                        </div>

                        <div class="create-task-container">
                            <label for="create-task-description">Description</label>
                            <input type="text" id="create-task-description" name="description" maxlength="50">
                        </div>

                        <div class="create-task-container">
                            <p>Importance</p>

                            <select name="importance" id="create-task-importance">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div class="create-task-container">
                            <p>Subject</p>

                            <select name="subjectId" id="create-task-subject">
                                <option value="">General</option>
                            </select>
                        </div>

                        <div class="create-task-container">
                            <p>Status</p>

                            <select name="status" id="create-task-status">
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div class="create-task-container">
                            <p>Deadline</p>
                            <input type="date" id="task-deadline" name="deadline">
                        </div>

                    </div>

                    <div id="create-task-buttons">
                        <button type="button" id="close-form-button">
                            Cancel
                        </button>

                        <button type="submit" id="update-form-button">
                            Update Task
                        </button>
                    </div>

                </form>
            `

            // Добваление Subjects в Update Task  👇

            const createTaskSubjects = document.querySelector("#create-task-subject")

            let subjectsString = `<option value="">General</option>`

            for (let subject of subjectsData.subjects) {
                subjectsString += `<option value="${subject.id}">${subject.title}</option>`
            }

            createTaskSubjects.innerHTML = subjectsString

            // хз че 👇
            
            const titleInput = document.querySelector("#create-task-title")
            const descriptionInput = document.querySelector("#create-task-description")
            const importanceSelect = document.querySelector("#create-task-importance")
            const subjectSelect = document.querySelector("#create-task-subject")
            const statusSelect = document.querySelector("#create-task-status")
            const deadlineInput = document.querySelector("#task-deadline")

            const taskId = task.dataset.taskId

            const taskData = tasksData.tasks.find(task => task.id == Number(taskId))

            const taskDeadline = taskData.deadline === null
                ? "" 
                : (new Date(taskData.deadline)).toISOString().slice(0, 10)

            const taskSubject = taskData.subject_id === null
                ? ""
                : taskData.subject_id

            titleInput.value = taskData.title
            descriptionInput.value = taskData.description
            importanceSelect.value = taskData.importance
            subjectSelect.value = taskSubject
            statusSelect.value = taskData.status
            deadlineInput.value = taskDeadline

            // Появление меню для Update 👇

            body.classList.add("darkened")
            createTaskForm.classList.remove("unvisible")

            // Логика Update Task 👇

            const closeFormButton = document.querySelector("#close-form-button")
            const updateFormButton = document.querySelector("#update-form-button")
            const updateForm = document.querySelector("#update-task-form")

            closeFormButton.addEventListener("click", event => {
                event.preventDefault()
            
                body.classList.remove("darkened")
                createTaskForm.classList.add("unvisible")
            })

            updateFormButton.addEventListener("click", async event => {
                event.preventDefault()

                const dataFromForm = new FormData(updateForm)
                const formData = Object.fromEntries(dataFromForm)

                console.log(formData)

                if (formData.deadline === "") {
                    formData.deadline = undefined
                }
                if (formData.subjectId === "") {
                    formData.subjectId = undefined
                }

                const response = await fetch(`/api/tasks/${task.dataset.taskId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (!response.ok) {
                    alert(response.statusText)
                }

                if (response.ok) {
                    window.location.href = "/tasks"
                }
            })
        })
    })
}



const subjectsData = await getSubjectsData()

async function init() {
    const tasksData = await getTasksData()

    if (!tasksData || !subjectsData) {
        return
    }

    setSubjects(subjectsData)
    setTasksNumber(tasksData)
    setTasks(tasksData, subjectsData)
}

init()


addTaskButton.addEventListener("click", (event) => {
    event.preventDefault()
    // Создание формы 👇
    createTaskForm.innerHTML = `
        <form id="create-task-form-1">

            <h1>Create New Task</h1>

            <div id="create-task-data-container">

                <div class="create-task-container">
                    <label for="create-task-title">Title</label>
                    <input type="text" id="create-task-title" name="title" required maxlength="20">
                </div>

                <div class="create-task-container">
                    <label for="create-task-description">Description</label>
                    <input type="text" id="create-task-description" name="description" maxlength="50">
                </div>

                <div class="create-task-container">
                    <p>Importance</p>

                    <select name="importance" id="create-task-importance">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="create-task-container">
                    <p>Subject</p>

                    <select name="subjectId" id="create-task-subject">
                        
                    </select>
                </div>

                <div class="create-task-container">
                    <p>Status</p>

                    <select name="status" id="create-task-status">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div class="create-task-container">
                    <p>Deadline</p>
                    <input type="date" id="task-deadline" name="deadline">
                </div>

            </div>

            <div id="create-task-buttons">
                <button type="button" id="close-form-button">
                    Cancel
                </button>

                <button type="submit" id="create-task-button">
                    Create Task
                </button>
            </div>

        </form>
    `
    // Затемнение экрана 👇
    body.classList.add("darkened")
    createTaskForm.classList.remove("unvisible")

    // Кнопка закрытия меню 👇
    const closeFormButton = document.querySelector("#close-form-button")

    closeFormButton.addEventListener("click", event => {
        event.preventDefault()

        body.classList.remove("darkened")
        createTaskForm.classList.add("unvisible")
    })

    // Добавление предметов 👇

    const createTaskSubjects = document.querySelector("#create-task-subject")

    let subjectsString = `<option value="">General</option>`

    for (let subject of subjectsData.subjects) {
        subjectsString += `<option value="${subject.id}">${subject.title}</option>`
    }

    createTaskSubjects.innerHTML = subjectsString

    // Кнопка создания 👇

    const createTaskButton = document.querySelector("#create-task-button")
    const createTaskForm1 = document.querySelector("#create-task-form-1")

    createTaskButton.addEventListener("click", async (event) => {
        event.preventDefault()

        const dataFromForm = new FormData(createTaskForm1)
        const formData = Object.fromEntries(dataFromForm)

        if (formData.deadline === "") {
            formData.deadline = undefined
            }
        if (formData.subjectId === "") {
            formData.subjectId = undefined
        }

        console.log(formData.deadline)

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            alert(response.statusText)
        }

        if (response.ok) {
            window.location.href = "/tasks"
        }
    })
})

