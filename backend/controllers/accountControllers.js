import {registerService, loginService, myAccountService} from "../services/accountServices.js"

async function register(req, res) {
    const {name, username, email, password} = req.body

    const result = await registerService(name.toLowerCase(), username.toLowerCase(), email.toLowerCase(), password)

    res.status(201).json(result)
}

async function login(req, res) {
    const {username, password} = req.body

    const result = await loginService(username.toLowerCase(), password)

    res.cookie("token", result.token, {
        httpOnly: true
    })

    res.status(200).json(result)
    // res.status(200).json({"message": "Successfuly loged in"})
}

async function myAccount(req, res) {
    const result = await myAccountService(req.user.id)

    res.status(200).json(result)
}

function deleteToken(req, res) {
    res.clearCookie("token")
    res.sendStatus(200)
}

export {register, login, myAccount, deleteToken}