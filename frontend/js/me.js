const body = document.querySelector("body")
const profilePicture = document.querySelector("#profile-picture")
const profileCard = document.querySelector("#profile-card")

function applyTheme() {
    const theme = localStorage.getItem("theme")

    if (theme === "light") {
        body.style.color = "#0F172A"
        body.style.background = "#F8FAFC"
        profilePicture.style.border = "#CBD5E1 0.2rem solid"
        profileCard.style.background = "#E2E8F0"
        profileCard.style.border = "#CBD5E1 0.2rem solid"
    } else {
        body.style.color = "#E2E8F0"
        body.style.background = "#0F172A"
        profilePicture.style.border = "#334155 0.2rem solid"
        profileCard.style.background = "#1E293B"
        profileCard.style.border = "#334155 0.2rem solid"
    }
}

applyTheme()



async function getUserData() {
    const response = await fetch("/account/me")
    const result = await response.json()

    if (!response.ok) {
        alert("Something went wrong.") // тут можешь обработать ошибки
    } else {
        return result
    }
}

const data = await getUserData()

const {name, username, created_at, tasks, subjects} = data

const nameElement = document.querySelector("#name")
const usernameElement = document.querySelector("#username")
const createdAtElement = document.querySelector("#created-at-date")
const subjectElement = document.querySelector("#subjectsNumber")
const tasksElement = document.querySelector("#tasksNumber")

nameElement.textContent = name
usernameElement.textContent = "@"+username
tasksElement.textContent = tasks
subjectElement.textContent = subjects

const date = new Date(created_at)

createdAtElement.textContent = date.toLocaleString()
