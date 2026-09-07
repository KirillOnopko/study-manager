import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getMainPage(req, res) {
    res.status(200).sendFile(
        path.join(__dirname, "../../docs/index.html")
    )
}

function getRegistrationPage(req, res) {
    res.status(200).sendFile(
        path.join(__dirname, "../../docs/html/registration.html")
    )
}

function getLoginPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/login.html"))
}

function getDashboardPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/dashboard.html"))
}

function getAccountPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/me.html"))
}

function getTasksPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/tasks.html"))
} 

function getSubjectsPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/subjects.html"))
}

function getHelperPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../docs/html/ai-helper.html"))
}


export {getMainPage, getRegistrationPage, getLoginPage, 
        getDashboardPage, getAccountPage, getTasksPage,
        getSubjectsPage, getHelperPage}