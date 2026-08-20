import pool from "../db.js"
import { CustomError } from "../errors/customError.js"

async function getTasksService(ownerId) {
    const result = await pool.query("SELECT * FROM tasks WHERE owner_id = $1", [ownerId])

    return result.rows
}

async function getTaskService(id, ownerId) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND owner_id = $2", [id, ownerId])
    
    if (result.rows.length === 0) {
        throw new CustomError("Task not found.", 404)
    }

    return result.rows[0]
}

async function createTaskService(ownerId, title, description, status, importance, deadline, subjectId) {
    if (status === undefined) {
        status = "pending"
    }
    if (importance === undefined) {
        importance = "low"
    }

    const result = await pool.query("INSERT INTO tasks (title, description, status, importance, deadline, subject_id, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [title, description, status, importance, deadline, subjectId, ownerId])

    return result.rows[0]
} 

async function updateTaskService(ownerId, taskId, title, description, status, importance, deadline, subjectId) {
    const taskCheck = await pool.query("SELECT * FROM tasks WHERE owner_id = $1 AND id = $2", [ownerId, taskId])

    if (taskCheck.rows.length === 0) {
        throw new CustomError("Task not found.", 404)
    }

    if (title === undefined) {
        title = taskCheck.rows[0].title
    }
    if (description === undefined) {
        description = taskCheck.rows[0].description
    }
    if (status === undefined) {
        status = taskCheck.rows[0].status
    }
    if (importance === undefined) {
        importance = taskCheck.rows[0].importance
    }
    if (deadline === undefined) {
        deadline = taskCheck.rows[0].deadline
    }
    if (subjectId === undefined) {
        subjectId = taskCheck.rows[0].subject_id
    }

    const result = await pool.query("UPDATE tasks SET title = $1, description = $2, status = $3, importance = $4, deadline = $5, subject_id = $6 WHERE id = $7 and owner_id = $8 RETURNING *", [title, description, status, importance, deadline, subjectId, taskId, ownerId])

    return result.rows[0]
}

async function deleteTaskService(ownerId, taskId) {
    const result = await pool.query("DELETE FROM tasks WHERE owner_id = $1 AND id = $2", [ownerId, taskId])

    if (result.rowCount === 0) {
        throw new CustomError("Task not found", 404)
    }

    return result.rowCount
}

export {getTasksService, getTaskService, createTaskService, updateTaskService, deleteTaskService}