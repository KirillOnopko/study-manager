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

const sun = `<svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
const moon = `<svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`

const switchThemeButton = document.querySelector("#switch-theme-button")
const body = document.querySelector("body")
const header = document.querySelector("header")
const menuButtons = document.querySelectorAll(".menu-button") 

function applyTheme() {
    const theme = localStorage.getItem("theme")

    if (theme === "light") {
        switchThemeButton.innerHTML = moon
        body.style.color = "#0F172A"
        body.style.background = "#F8FAFC"
        header.style.background = "#E2E8F0"
        header.style.borderBottom = "#CBD5E1 0.2rem solid"
        menuButtons.forEach((button) => button.style.color = "#0F172A")
    } else {
        switchThemeButton.innerHTML = sun
        body.style.color = "#E2E8F0"
        body.style.background = "#0F172A"
        header.style.background = "#1E293B"
        header.style.borderBottom = "#334155 0.2rem solid"
        menuButtons.forEach((button) => button.style.color = "#E2E8F0")
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