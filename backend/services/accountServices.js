import pool from "../db.js"

async function registerService() {
    const result = await pool.query("", [])
    return result.rows[0]
}

async function loginService() {
    const result = await pool.query("", [])
    return result.rows[0]
}

export {registerService, loginService}