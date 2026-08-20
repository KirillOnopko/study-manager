import {getSubjectsService, createSubjectService, deleteSubjectService, updateSubjectService} from "../services/subjectsServices.js"

async function getSubjects(req, res) {
    const id = req.user.id
    const result = await getSubjectsService(id)
    res.status(200).json(result)
}

async function createSubject(req, res) {
    const id = req.user.id
    let {title, description, color} = req.body
    if (!color) {
        color = "#FFFFFF"
    }
        

    const result = await createSubjectService(id, title, description, color)
    res.status(201).json(result)
}

async function deleteSubject(req, res) {
    const result = await deleteSubjectService(req.params.id, req.user.id)
    res.sendStatus(204)
}

async function updateSubject(req, res) {
    const ownerId = req.user.id
    const id = req.params.id
    const {title, description, color} = req.body

    const result = await updateSubjectService(id, title, description, color, ownerId)
    res.status(200).json(result)
}

export {getSubjects, createSubject, deleteSubject, updateSubject}