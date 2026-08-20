import { CustomError } from "../errors/customError.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

const jwtSecret = process.env.JWT_SECRET

async function checkToken(req, res, next) {
    const bearerToken = req.get("Authorization")

    if (!bearerToken) {
        throw new CustomError("JWT required.", 401)
    }
    if (bearerToken.trim() === "") {
        throw new CustomError("JWT required.", 401)
    }

    const token = bearerToken.split(" ")

    if (token[0] !== "Bearer") {
        throw new CustomError("Wrong token format.", 400)
    }
    if (token.length === 1) {
        throw new CustomError("Wrong token format.", 400)
    }
    if (token.length >= 3) {
        throw new CustomError("Wrong token format.", 400)
    }

    try {
        const payload = jwt.verify(token[1], jwtSecret)

        req.user = payload

        next()
    } catch (error) {
        next(new CustomError("Wrong token.", 401))
    }
}

export {checkToken}