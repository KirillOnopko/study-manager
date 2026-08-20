async function errorHandler(error, req, res, next) {
    if (error.statusCode) {
        console.log(`Произошла ошибка.`)
        console.log(`Причина: ${error.message} // Код: ${error.statusCode}`)

        res.status(error.statusCode).json({
            "message": error.message
        })
    } else {
        console.log("Прозошла ошибка на сервере.")
        console.log(`Причина: ${error.message}`)

        res.status(500).json({
            "message": "Internal server error"
        })
    }
}

async function notFoundHandler(req, res, next) {
    res.status(404).json({
        "message": "Page Not Found"
    })
}

export {errorHandler, notFoundHandler}