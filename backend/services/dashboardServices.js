import pool from "../db.js"
import {CustomError} from "../errors/customError.js"

async function getDashboardDataService(id) {
    const allTasks = await pool.query(`SELECT
                                        statuses.status,
                                        COUNT(tasks.id) AS count
                                    FROM (
                                        VALUES
                                            ('pending'),
                                            ('in_progress'),
                                            ('completed')
                                    ) AS statuses(status)
                                    LEFT JOIN tasks
                                        ON tasks.status = statuses.status
                                        AND tasks.owner_id = $1
                                    GROUP BY statuses.status
                                    ORDER BY statuses.status;`, [id])

    const upcomingTasks = await pool.query(
        `SELECT
            tasks.*,
            subjects.title AS subject_title
        FROM tasks
        LEFT JOIN subjects
            ON tasks.subject_id = subjects.id
        WHERE tasks.owner_id = $1
        AND tasks.status <> 'completed'
        ORDER BY tasks.deadline ASC
        LIMIT 5`,
        [id]
    )

    const subjects = await pool.query(
        `SELECT
            subjects.id,
            subjects.title,
            COUNT(tasks.id) AS task_count,
            COUNT(tasks.id) FILTER (WHERE tasks.status = 'completed') AS completed_count
        FROM subjects
        LEFT JOIN tasks
            ON tasks.subject_id = subjects.id
        WHERE subjects.owner_id = $1
        GROUP BY subjects.id, subjects.title LIMIT 3`,
        [id]
)

    return {
        "tasks": allTasks.rows,
        "upcomingTasks": upcomingTasks.rows,
        "subjects": subjects.rows
    }
}

export {getDashboardDataService}