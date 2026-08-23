import express from "express"
import {register, login, myAccount, deleteToken} from "../controllers/accountControllers.js"
import { loginDataValidator, registerDataValidator } from "../middleware/validation.js"
import { checkToken } from "../middleware/authorization.js"

const accountRouter = express.Router()

accountRouter.post("/registration", registerDataValidator, register)
accountRouter.post("/login", loginDataValidator, login)
accountRouter.get("/me", checkToken, myAccount)
accountRouter.post("/logout", deleteToken)

export {accountRouter}