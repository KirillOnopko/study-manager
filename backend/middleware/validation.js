import { CustomError } from "../errors/customError.js";

// ПОПРОБУЙ УЛУЧШИТЬ ВАЛИДАТОРЫ, ВЫНЕСЯ ПРОВЕРКИ В ОТДЕЛЬНЫЕ ФУНКЦИИ

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

function checkParamsId(req, res, next) {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        throw new CustomError("Id must be a number.", 400)
    }
    if (!Number.isInteger(id)) {
        throw new CustomError("Id must be an integer.", 400)
    }
    if (id <= 0) {
        throw new CustomError("Id can not be zero or less.", 400)
    }

    next()
}

function createSubjectValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new CustomError("Body must be a object.", 400)
    }

    const {title, description, color} = req.body

    if (title === undefined && description === undefined && color === undefined) {
        throw new CustomError("Title/Description/Color required.", 400)
    }

    if (title === undefined) {
        throw new CustomError("Title required.", 400)
    }
    if (typeof title !== "string") {
        throw new CustomError("Title must be a string.", 400)
    }
    if (title.trim() === "") {
        throw new CustomError("Title required.", 400)
    }
    if (title.length > 20) {
        throw new CustomError("Title must have maximum 20 symbols.", 400)
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            throw new CustomError("Description must be a string.", 400)
        }
        if (description.length > 30) {
            throw new CustomError("Description must have maximum 30 symbols.", 400)
        }
    }

    if (color !== undefined) {
        if (typeof color !== "string") {
            throw new CustomError("Color must be a string.", 400)
        }
        if (!(/^#[0-9A-Fa-f]{6}$/.test(color))) {
            throw new CustomError("Color must be in HEX-Format.", 400)
        }
    }

    next()
}

function updateSubjectValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new CustomError("Body must be a object.", 400)
    }

    const {title, description, color} = req.body

    if (title === undefined && description === undefined && color === undefined) {
        throw new CustomError("Title/Description/Color required.", 400)
    }

    if (title !== undefined) {
        if (typeof title !== "string") {
            throw new CustomError("Title must be a string.", 400)
        }
        if (title.trim() === "") {
            throw new CustomError("Title required.", 400)
        }
        if (title.length > 20) {
            throw new CustomError("Title must have maximum 20 symbols.", 400)
        }
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            throw new CustomError("Description must be a string.", 400)
        }
        if (description.length > 30) {
            throw new CustomError("Description must have maximum 30 symbols.", 400)
        }
    }

    if (color !== undefined) {
        if (typeof color !== "string") {
            throw new CustomError("Color must be a string.", 400)
        }
        if (!(/^#[0-9A-Fa-f]{6}$/.test(color))) {
            throw new CustomError("Color must be in HEX-Format.", 400)
        }
    }

    next()
}

function createTaskValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new CustomError("Body must be a object.", 400)
    }

    const {title, description, status, importance, deadline, subjectId} = req.body

    if (title === undefined) {
        throw new CustomError("Title required.", 400)
    }
    if (typeof title !== "string") {
        throw new CustomError("Title must be a string.", 400)
    }
    if (title.trim() === "") {
        throw new CustomError("Title required.", 400)
    }
    if (title.length > 20) {
        throw new CustomError("Title must have maximum 20 symbols.", 400)
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            throw new CustomError("Description must be a string.", 400)
        }
        if (description.length > 50) {
            throw new CustomError("Description must have maximum 50 symbols.", 400)
        }
    }

    if (status !== undefined) {
        if (typeof status !== "string") {
            throw new CustomError("Status must be a string", 400)
        }
        if (status === "pending" || status === "in_progress" || status === "completed") {} else {
            throw new CustomError("Status must be 'Pending' or 'in_progress' or 'completed'.", 400)
        }
    }

    if (importance !== undefined) {
        if (typeof importance !== "string") {
            throw new CustomError("Importance must be a string", 400)
        }
        if (importance === "low" || importance === "medium" || importance === "high") {} else {
            throw new CustomError("Importance must be 'low' or 'medium' or 'high'.", 400)
        }
    }

    if (deadline !== undefined) {
        if (typeof deadline !== "string") {
            throw new CustomError("Deadline must be a string.", 400)
        }
        if (!(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(deadline))) {
            throw new CustomError("Wrong date format.", 400)
        }
        const date = new Date(deadline)
        if (Number.isNaN(date.getTime())) {
            throw new CustomError("Wrong date.", 400)
        }
    }

    if (subjectId !== undefined) {
        const id = Number(subjectId) 
        if (Number.isNaN(id)) {
            throw new CustomError("Subject Id must be a Number.", 400)
        }
        if (!Number.isInteger(id)) {
            throw new CustomError("Subject Id must be a Integer.", 400)
        }
    }

    next()
}

function updateTaskValidator(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new CustomError("Body must be a object.", 400)
    }

    const {title, description, status, importance, deadline, subjectId} = req.body
    
    if (title === undefined && description === undefined && status === undefined && importance === undefined && deadline === undefined && subjectId === undefined) {
        throw new CustomError("No data provided.", 400)
    }

    if (title !== undefined) {
        if (typeof title !== "string") {
            throw new CustomError("Title must be a string.", 400)
        }
        if (title.trim() === "") {
            throw new CustomError("Title required.", 400)
        }
        if (title.length > 20) {
            throw new CustomError("Title must have maximum 20 symbols.", 400)
        }
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            throw new CustomError("Description must be a string.", 400)
        }
        if (description.length > 50) {
            throw new CustomError("Description must have maximum 50 symbols.", 400)
        }
    }

    if (status !== undefined) {
        if (typeof status !== "string") {
            throw new CustomError("Status must be a string", 400)
        }
        if (status === "pending" || status === "in_progress" || status === "completed") {} else {
            throw new CustomError("Status must be 'pending' or 'in_progress' or 'completed'.", 400)
        }
    }

    if (importance !== undefined) {
        if (typeof importance !== "string") {
            throw new CustomError("Importance must be a string", 400)
        }
        if (importance === "low" || importance === "medium" || importance === "high") {} else {
            throw new CustomError("Importance must be 'low' or 'medium' or 'high'.", 400)
        }
    }

    if (deadline !== undefined) {
        if (typeof deadline !== "string") {
            throw new CustomError("Deadline must be a string.", 400)
        }
        if (!(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(deadline))) {
            throw new CustomError("Wrong date format.", 400)
        }
        const date = new Date(deadline)
        if (Number.isNaN(date.getTime())) {
            throw new CustomError("Wrong date.", 400)
        }
    }

    if (subjectId !== undefined) {
        const id = Number(subjectId) 
        if (Number.isNaN(id)) {
            throw new CustomError("Subject Id must be a Number.", 400)
        }
        if (!Number.isInteger(id)) {
            throw new CustomError("Subject Id must be a Integer.", 400)
        }
        if (id < 1) {
            throw new CustomError("Invalid Subject Id", 400)
        }
    }

    next()
}

export {registerDataValidator, loginDataValidator, checkParamsId, 
        createSubjectValidator, updateSubjectValidator, createTaskValidator, 
        updateTaskValidator}