import express from "express"
import {getMainPage, getRegistrationPage, getLoginPage, 
        getDashboardPage, getAccountPage, getTasksPage,
        getSubjectsPage, getHelperPage} from "../controllers/pageControllers.js"
import { checkToken } from "../middleware/authorization.js"

const pageRouter = express.Router()

pageRouter.get("/", getMainPage)
pageRouter.get("/registration", getRegistrationPage)
pageRouter.get("/login", getLoginPage)
pageRouter.get("/dashboard", checkToken, getDashboardPage)
pageRouter.get("/me", checkToken, getAccountPage)
pageRouter.get("/tasks", checkToken, getTasksPage)
pageRouter.get("/subjects", checkToken, getSubjectsPage)
pageRouter.get("/ai-helper", checkToken, getHelperPage)

export {pageRouter}