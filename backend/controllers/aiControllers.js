import { sendMessageService } from "../services/aiServices.js"

async function sendMessage(req, res) {
    const messages = req.body

    const stream = await sendMessageService(messages)

    const reader = stream.getReader()

    while (true) {
        const {value, done} = await reader.read()

        if (done) {
            break
        }

        res.write(value)
    }

    res.end()
}

export {sendMessage}