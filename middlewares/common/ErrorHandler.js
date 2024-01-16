const createHttpError = require("http-errors");

// Not Found Handler
const NotFoundHandler = (req, res, next) => {
    next(createHttpError(404, 'Your Requested Content Was Not Found'));
}

const ServerErrorHandler = (err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV === 'development ' ? err : {message: err.message};

    res.status(err.status || 500);
    console.log(err)

    if(res.locals.html){
        // Html Response
        res.locals.title = `Error - ${process.env.APP_NAME}`
        res.render('error');

    }else{
        // Json Response
        // ErrorResponse(res, err.status || 500, err.message || 'Internal Server Error', res.locals.error);
        res.json({
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
            error: res.locals.error
        });
    }
}

module.exports = {
    NotFoundHandler,
    ServerErrorHandler
}