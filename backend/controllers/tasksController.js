import {getTasksService, getTaskService, createTaskService, updateTaskService, deleteTaskService} from"../services/tasksServices.js"

async function getTasks(req, res) {
    const result = await getTasksService(req.user.id)
    res.status(200).json(result)
}

async function getTask(req, res) {
    const result = await getTaskService(req.params.id, req.user.id)
    res.status(200).json(result)
}

async function createTask(req, res) {
    const ownerId = req.user.id
    const {title, description, status, importance, deadline, subjectId} = req.body

    const result = await createTaskService(ownerId, title, description, status, importance, deadline, subjectId)
    res.status(201).json(result)
}

async function updateTask(req, res) {
    const ownerId = req.user.id
    const taskId = req.params.id
    const {title, description, status, importance, deadline, subjectId} = req.body

    const result = await updateTaskService(ownerId, taskId, title, description, status, importance, deadline, subjectId)
    res.status(200).json(result)
}

async function deleteTask(req, res) {
    const result = await deleteTaskService(req.user.id, req.params.id)
    res.sendStatus(204)
}

export {getTasks, getTask, createTask, updateTask, deleteTask}