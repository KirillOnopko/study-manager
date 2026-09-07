// -- // -- // СНИЗУ LOG OUT

const body = document.querySelector("body")

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

// СНИЗУ ГЛАВНОЕ ДЛЯ SUBJECTS 👇

const createSubjectButton = document.querySelector("#create-subject-button")
const subjectForm = document.querySelector("#subject-form")

async function getSubjectsData() {
    const response = await fetch("/api/subjects")

    if (!response.ok) {
        alert(response.statusText)
        return
    }

    const data = await response.json()

    return data
}

function setSubjectsHeader(data) {
    const subjectsNumber = document.querySelector("#subjects-number")
    const subjectsWord = document.querySelector("#subjects-word")

    subjectsNumber.textContent = data.number

    if (data.number === 1) {
        subjectsWord.textContent = "subject"
    }
}



function setSubjects(data) {
    // Создание карточек предметов 👇
    const subjectsField = document.querySelector("#subjects-field")
    let subjectCards = ""

    for (let subject of data.subjects) {
        subjectCards += `<div class="subject-field" data-subject-id="${subject.id}">
                                <div class="edit-subject-menu invisible">
                                    <button class="update-subject-button">Update</button>
                                    <button class="delete-subject-button">Delete</button>
                                    <button class="close-subject-menu"> 
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
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
                                </div>
                                <button class="edit-subject-button">⋮</button>
                                <p class="subject-title">${subject.title}</p>
                                <p class="subject-description">${subject.description === null ? "No Description" : subject.description}</p>
                                <progress value="${subject.completed_count}" max="${subject.task_count}"></progress>
                                <p>${subject.task_count} tasks · ${subject.completed_count} completed</p>
                           </div>`
    }

    subjectsField.innerHTML = subjectCards

    // Логика для Edit-buttons 👇

    const editButtons = document.querySelectorAll(".edit-subject-button")

    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault()

            const subjectField = button.closest(".subject-field")
            const editSubjectMenu = subjectField.querySelector(".edit-subject-menu") 
            
            subjectField.classList.add("darkened")
            editSubjectMenu.classList.remove("invisible")
        })
    })

    // Логика для Close-buttons 👇

    const closeButtons = document.querySelectorAll(".close-subject-menu")

    closeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault()

            const subjectField = button.closest(".subject-field")
            const editSubjectMenu = subjectField.querySelector(".edit-subject-menu") 
            
            subjectField.classList.remove("darkened")
            editSubjectMenu.classList.add("invisible")
        })
    })

    //Логика для Delete-buttons 👇

    const deleteButtons = document.querySelectorAll(".delete-subject-button")

    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault()

            const subjectField = button.closest(".subject-field")
            const subjectId = subjectField.dataset.subjectId

            const response = await fetch(`/api/subjects/${subjectId}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                alert(response.statusText)
            } else {
                window.location.href = "/subjects"
            }
        })
    })

    // Логика для Update-buttons 👇

    const updateButtons = document.querySelectorAll(".update-subject-button")
    const subjectForm = document.querySelector("#subject-form")

    updateButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault()

            const subjectField = button.closest(".subject-field")
            const subjectId = subjectField.dataset.subjectId

            const oldTitle = subjectField.querySelector(".subject-title")
            const oldDescription = subjectField.querySelector(".subject-description")

            body.classList.add("darkened")
            subjectForm.classList.remove("invisible")

            subjectForm.innerHTML = `<form id="update-subject-form" class="subject-form">
                    <h1>Update new Subject</h1>

                    <div id="title-field">
                        <label for="title-input" id="title-label">Title</label>
                        <input type="text" name="title" id="title-input" value="${oldTitle.textContent}">
                    </div>

                    <div id="description-field">
                        <label for="description-input" id="description-label">Description</label>
                        <input type="text" name="description" id="description-input" value="${oldDescription.textContent === "No Description" ? "" : oldDescription.textContent}">
                    </div>

                    <div id="form-buttons">
                        <button class="form-button" id="cancel-button">Cancel</button>
                        <button type="submit" class="form-button" id="create-button">Update</button>
                    </div>
                </form>`

            const cancelButton = document.querySelector("#cancel-button")

            cancelButton.addEventListener("click", (event) => {
                event.preventDefault()

                body.classList.remove("darkened")
                subjectForm.classList.add("invisible")
            })

            const updateSubjectForm = document.querySelector("#update-subject-form")

            updateSubjectForm.addEventListener("submit", async (event) => {
                event.preventDefault()

                const formData = new FormData(updateSubjectForm)
                const data = Object.fromEntries(formData)

                if (data.description === "") {
                    data.description = undefined
                }

                const response = await fetch(`/api/subjects/${subjectId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                if (!response.ok) {
                    alert(response.statusText)
                    return
                }

                if (response.ok) {
                    window.location.href = "/subjects"
                }
            })
        })
    })
}

async function init() {
    const subjectsData = await getSubjectsData()

    setSubjectsHeader(subjectsData)
    setSubjects(subjectsData)
}

init()

createSubjectButton.addEventListener("click", (event) => {
    event.preventDefault()

    // Создание create-формы 👇

    body.classList.add("darkened")
    subjectForm.classList.remove("invisible")

    subjectForm.innerHTML = `<form id="create-subject-form" class="subject-form">
                    <h1>Create new Subject</h1>

                    <div id="title-field">
                        <label for="title-input" id="title-label">Title</label>
                        <input type="text" name="title" id="title-input" required>
                    </div>

                    <div id="description-field">
                        <label for="description-input" id="description-label">Description</label>
                        <input type="text" name="description" id="description-input">
                    </div>

                    <div id="form-buttons">
                        <button class="form-button" id="cancel-button">Cancel</button>
                        <button type="submit" class="form-button" id="create-button">Create</button>
                    </div>
                </form>`

    // Кнопка cancel 👇

    const cancelButton = document.querySelector("#cancel-button")

    cancelButton.addEventListener("click", e => {
        e.preventDefault()

        body.classList.remove("darkened")
        subjectForm.classList.add("invisible")
    })

    // Кнопка Create Subject 👇

    const createSubjectForm = document.querySelector("#create-subject-form")

    createSubjectForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(createSubjectForm)
        const data = Object.fromEntries(formData)

        const response = await fetch("/api/subjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            window.location.href = "/subjects"
        }

        if (!response.ok) {
            alert(response.statusText)
        }
    })
})