import {registerService, loginService} from "../services/accountServices.js"

async function register(req, res, next) {
    const result = await registerService()

    res.status(200).json(result)
}

async function login(req, res, next) {
    const result = await loginService()

    res.status(200).json(result)
}

export {register, login}