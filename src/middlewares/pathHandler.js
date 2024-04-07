function pathHandler(req, res, next){
    return res.json({
        statusCoder: 404,
        message: `${req.method} ${req.url} NOT FOUND PATH`
    })
}

export default pathHandler 