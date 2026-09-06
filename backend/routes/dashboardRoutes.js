import express from "express"
import { getDashboardData } from "../controllers/dashboardControllers.js"
import { checkToken } from "../middleware/authorization.js"

const dashboardRouter = express.Router()

dashboardRouter.get("/", checkToken, getDashboardData)

export {dashboardRouter}