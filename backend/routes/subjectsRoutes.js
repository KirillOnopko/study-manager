import express from "express"
import { getSubjects, createSubject, deleteSubject, updateSubject } from "../controllers/subjectsControllers.js"
import { checkToken } from "../middleware/authorization.js"
import { checkParamsId } from "../middleware/validation.js"
import {createSubjectValidator, updateSubjectValidator} from "../middleware/validation.js"

const subjectsRouter = express.Router()

subjectsRouter.get("/", checkToken, getSubjects)
subjectsRouter.post("/", checkToken, createSubjectValidator, createSubject)
subjectsRouter.patch("/:id", checkToken, checkParamsId, updateSubjectValidator, updateSubject)
subjectsRouter.delete("/:id", checkToken, checkParamsId, deleteSubject)

export {subjectsRouter}