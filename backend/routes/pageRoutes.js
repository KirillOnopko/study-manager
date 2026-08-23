import express from "express"
import {getMainPage, getRegistrationPage, getLoginPage, getDashboardPage, getAccountPage} from "../controllers/pageControllers.js"
import { checkToken } from "../middleware/authorization.js"

const pageRouter = express.Router()

pageRouter.get("/", getMainPage)
pageRouter.get("/registration", getRegistrationPage)
pageRouter.get("/login", getLoginPage)
pageRouter.get("/dashboard", checkToken, getDashboardPage)
pageRouter.get("/me", checkToken, getAccountPage)

export {pageRouter}