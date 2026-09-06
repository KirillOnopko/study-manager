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


// Снизу все для AI - Helper

const aiHelperInput = document.querySelector("#ai-helper-input")
const aiHelperChat = document.querySelector("#ai-helper-chat")
const messages = []

function renderMessages(messages) {
    aiHelperChat.replaceChildren()

    for (const message of messages) {
        const p = document.createElement("p")

        if (message.role === "user") {
            p.classList.add("user-message")
            p.textContent = `You: ${message.content}`
        } else if (message.role === "assistant") {
            p.textContent = `Terminator: ${message.content}`
        }

        aiHelperChat.append(p)
    }
}

aiHelperInput.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(aiHelperInput)
    const userInput = Object.fromEntries(formData)

    messages.push({
        "role": "user",
        "content": userInput.message
    })
    renderMessages(messages)
    aiHelperInput.reset()

    try {
        const response = await fetch("/api/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })
        
        if (!response.ok) {
            alert(response.statusText)
            return
        }

        const reader = response.body.getReader()

        const decoder = new TextDecoder()

        let responseString = ""

        const p = document.createElement("p")
        p.classList.add("active-response")
        aiHelperChat.append(p)

        let buffer = ""

        while (true) {
            const {value, done} = await reader.read()

            if (done) {
                p.classList.remove("active-response")
                messages.push({
                    "role": "assistant",
                    "content": responseString
                })
                break
            }
        
            const text = decoder.decode(value, {stream: true})

            buffer += text

            const lines = buffer.split("\n")

            buffer = lines.pop()

            for (const line of lines) {
                if (!line.trim()) {
                    continue
                }

                const chunk = JSON.parse(line)

                responseString += chunk.message.content

                if (p.classList.contains("active-response")) {
                    p.textContent = `Terminator: ${responseString}`
                }

                aiHelperChat.scrollTop = aiHelperChat.scrollHeight
            }
        }

        if (buffer.trim()) {
            const chunk = JSON.parse(buffer)

            responseString += chunk.message.content
            p.textContent = `Terminator: ${responseString}`
        }
    } catch (error) {
        alert(error)
    }
})