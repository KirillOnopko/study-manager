import {registerService, loginService, myAccountService} from "../services/accountServices.js"

async function register(req, res, next) {
    const {name, username, email, password} = req.body

    const result = await registerService(name.toLowerCase(), username.toLowerCase(), email.toLowerCase(), password)

    res.status(201).json(result)
}

async function login(req, res, next) {
    const {username, password} = req.body

    const result = await loginService(username.toLowerCase(), password.toLowerCase())

    res.status(200).json(result)
}

async function myAccount(req, res, next) {
    const result = await myAccountService(req.user.id)

    res.status(200).json(result)
}

export {register, login, myAccount}