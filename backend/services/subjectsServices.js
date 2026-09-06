import { CustomError } from "../errors/customError.js"
import pool from "../db.js"

async function getSubjectsService(id) {
    const result = await pool.query(`SELECT
                                    subjects.id,
                                    subjects.title,
                                    subjects.description,
                                    COUNT(tasks.id) AS task_count,
                                    COUNT(tasks.id) FILTER (WHERE tasks.status = 'completed') AS completed_count
                                FROM subjects
                                LEFT JOIN tasks
                                    ON tasks.subject_id = subjects.id
                                WHERE subjects.owner_id = $1
                                GROUP BY subjects.id, subjects.title;`, [id])
    return {
        subjects: result.rows,
        number: result.rows.length
    }
}

async function createSubjectService(owner_id, title, description, color) {
    const result = await pool.query("INSERT INTO subjects (title, description, color, owner_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, color, owner_id])

    return result.rows[0]
}

async function deleteSubjectService(id, ownerId) {
    const result = await pool.query("DELETE FROM subjects WHERE id = $1 AND owner_id = $2", [id, ownerId])

    if (result.rowCount === 0) {
        throw new CustomError("There is no subject with this id or you are not an owner.", 400)
    }

    return result.rowCount
}

async function updateSubjectService(id, title, description, color, ownerId) {
    const result = await pool.query("SELECT * FROM subjects WHERE id = $1 AND owner_id = $2", [id, ownerId])

    if (result.rows.length === 0) {
        throw new CustomError("There is no subject with this id or you are not an owner.", 400)
    }

    if (title === undefined) {
        title = result.rows[0].title
    }
    if (description === undefined) {
        description = result.rows[0].description
    }
    if (color === undefined) {
        color = result.rows[0].color
    }

    const updateResult = await pool.query("UPDATE subjects SET title = $1, description = $2, color = $3 WHERE id = $4 RETURNING *", [title, description, color, id])

    if (updateResult.rows.length === 0) {
        throw new CustomError("Something went wrong.", 400)
    }

    return updateResult.rows[0]
}

export {getSubjectsService, createSubjectService, deleteSubjectService, updateSubjectService}