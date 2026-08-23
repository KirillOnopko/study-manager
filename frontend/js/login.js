const form = document.querySelector("form")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const response = await fetch("/account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
        const messageField = document.querySelector("#message-field")
        messageField.style.opacity = 1
        messageField.style.top = "5rem"
    } else {
        window.location.href = "/dashboard"
    }
})