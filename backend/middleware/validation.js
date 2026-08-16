import { CustomError } from "../errors/customError.js";

function registerDataValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object") {
        throw new CustomError("False type of object", 400)
    }

    const {name, username, email, password} = req.body
    
    if (!name) {
        throw new CustomError("Name required.", 400)
    }
    if (typeof name !== "string") {
        throw new CustomError("Name must be a string.", 400)
    }
    if (name.trim() === "") {
        throw new CustomError("Name can not be empty.", 400)
    }
    if (name.length > 20) {
        throw new CustomError("Name must not be larger then 20 symbols.", 400)
    }

    if (!username) {
        throw new CustomError("Username required.", 400)
    }
    if (typeof username !== "string") {
        throw new CustomError("Username must be a string.", 400)
    }
    if (username.trim() === "") {
        throw new CustomError("Username can not be empty.", 400)
    }
    if (username.length > 20) {
        throw new CustomError("Username must not be larger then 20 symbols.", 400)
    }

    if (!email) {
        throw new CustomError("Email required.", 400)
    }
    if (typeof email !== "string") {
        throw new CustomError("Email must be a string.", 400)
    }
    if (email.trim() === "") {
        throw new CustomError("Email can not be empty.", 400)
    }
    if (!email.includes("@")) {
        throw new CustomError("Email must have an '@' in it.", 400)
    }
    if (email.length > 50) {
        throw new CustomError("Email must not be larger then 50 symbols.", 400)
    }

    if (!password) {
        throw new CustomError("Password required.", 400)
    }
    if (typeof password !== "string") {
        throw new CustomError("Password must be a string.", 400)
    }
    if (password.trim() === "") {
        throw new CustomError("Password can not be empty.", 400)
    }
    if (password.length > 40) {
        throw new CustomError("Password must not be larger then 40 symbols.", 400)
    }

    next()
}

function loginDataValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object") {
        throw new CustomError("False type of object", 400)
    }
    
    const {username, password} = req.body
    
    if (!username) {
        throw new CustomError("Username required.", 400)
    }
    if (typeof username !== "string") {
        throw new CustomError("Username must be a string.", 400)
    }
    if (username.trim() === "") {
        throw new CustomError("Username can not be empty.", 400)
    }
    if (username.length > 20) {
        throw new CustomError("Username must not be larger then 20 symbols.", 400)
    }

    if (!password) {
        throw new CustomError("Password required.", 400)
    }
    if (typeof password !== "string") {
        throw new CustomError("Password must be a string.", 400)
    }
    if (password.trim() === "") {
        throw new CustomError("Password can not be empty.", 400)
    }
    if (password.length > 40) {
        throw new CustomError("Password must not be larger then 40 symbols.", 400)
    }

    next()
}

export {registerDataValidator, loginDataValidator}