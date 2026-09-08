async function errorHandler(error, req, res, next) {
    console.error("========== SERVER ERROR ==========")

    console.error(`Method: ${req.method}`)
    console.error(`Path: ${req.path}`)
    console.error(`Message: ${error?.message || "No message"}`)
    console.error(`Status: ${error?.statusCode || 500}`)

    if (error?.stack) {
        console.error("Stack:")
        console.error(error.stack)
    }

    if (error?.code) {
        console.error(`Code: ${error.code}`)
    }

    if (error?.detail) {
        console.error(`Detail: ${error.detail}`)
    }

    if (error?.hint) {
        console.error(`Hint: ${error.hint}`)
    }

    console.error("==================================")

    if (error?.statusCode) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    return res.status(500).json({
        message: "Internal server error"
    })
}

export { errorHandler }


async function notFoundHandler(req, res, next) {
    res.status(404).json({
        "message": "Page Not Found"
    })
}

export {errorHandler, notFoundHandler}