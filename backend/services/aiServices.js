import { CustomError } from "../errors/customError.js"

async function sendMessageService(messages) {
    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "qwen3:8b",
            messages: messages,
            stream: true,
            think: false
        })
    })

    if (!response.ok) {
        throw new CustomError("HTTP Error.")
    }

    return response.body
}

export {sendMessageService}