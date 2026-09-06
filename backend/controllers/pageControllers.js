import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getMainPage(req, res) {
    res.status(200).sendFile(
        path.join(__dirname, "../../frontend/html/index.html")
    )
}

function getRegistrationPage(req, res) {
    res.status(200).sendFile(
        path.join(__dirname, "../../frontend/html/registration.html")
    )
}

function getLoginPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/login.html"))
}

function getDashboardPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/dashboard.html"))
}

function getAccountPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/me.html"))
}

function getTasksPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/tasks.html"))
} 

function getSubjectsPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/subjects.html"))
}

function getHelperPage(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/html/ai-helper.html"))
}


export {getMainPage, getRegistrationPage, getLoginPage, 
        getDashboardPage, getAccountPage, getTasksPage,
        getSubjectsPage, getHelperPage}