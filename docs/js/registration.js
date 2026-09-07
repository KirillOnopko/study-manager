const registrationForm = document.querySelector("form")

registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(registrationForm)
    const data = Object.fromEntries(formData)

    const response = await fetch("/account/registration", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const messageField = document.querySelector("#message-field")

    if (!response.ok) {
        messageField.style.opacity = 1
        messageField.style.top = "5rem"
        messageField.innerHTML = "<p>Something went wrong.</p><p>Please try again later.</p>"
    } else {
        let seconds = 5
        messageField.innerHTML = `<p>Successful. You will be redirected on login page in <span>5</span> seconds</p>`
        messageField.style.background = "rgba(24, 210, 0, 0.5)"
        messageField.style.opacity = 1
        messageField.style.top = "5rem"
        
        const timer = setInterval(() => {
            const secondSpan = document.querySelector("span")
            secondSpan.innerHTML = seconds
            seconds-- 

            if (seconds === -1) {
                clearInterval(timer)
                window.location.href = "/login"
            }
        }, 1000)
    }
})