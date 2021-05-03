const clientErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json(err.message || "Internal server error.");
    next(err, req, res);
};

const serverErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    console.error(err.statusCode);
};

module.exports = {
    clientErrorHandler,
    serverErrorHandler
};