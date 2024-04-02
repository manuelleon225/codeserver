function errorHandler (error, req, res, next){
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "ERROR"
    })
}

export default errorHandler