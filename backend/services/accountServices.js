import pool from "../db.js"
import bcrypt from "bcrypt"
import {CustomError} from "../errors/customError.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

const jwtSecret = process.env.JWT_SECRET

async function registerService(name, username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query("INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, username, email, hashedPassword])

    if (result.rows.length === 0) {
        throw new CustomError("Something went wrong.", 400)
    }
    
    return result.rows[0]
}

async function loginService(username, password) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    if (result.rows.length === 0) {
        throw new CustomError("User not found", 404)
    }

    const isValid = await bcrypt.compare(password, result.rows[0].password)
    if (!isValid) {
        throw new CustomError("Wrong password", 401)
    }

    const token = jwt.sign({
        "id": result.rows[0].id,
        "username": result.rows[0].username
    }, jwtSecret, {expiresIn: "1h"})

    return {"token": token}
}

async function myAccountService(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])

    if (result.rows.length === 0) {
        throw new CustomError("User not found.", 404)
    }

    const {name, username, email, created_at} = result.rows[0]

    return {
        "name": name, 
        "username": username,
        "email": email,
        "created_at": created_at
    }
}

export {registerService, loginService, myAccountService}
