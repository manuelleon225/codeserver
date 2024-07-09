import logger from "../utils/winston.util.js"

function errorHandler (error, req, res, next){
    const message = `${req.method} ${req.url} _ ${error.statusCode} _${new Date().toLocaleTimeString()}   ${error.message}`
    logger.ERROR(message);
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "ERROR"
    })
}

export default errorHandler