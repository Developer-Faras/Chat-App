// Error Response
const ErrorResponse = (res, code, message, error) => {
    res.status(code).json({
        status: code,
        message,
        error
    })
}

// Success Response
const SuccessResponse = (res, code = 200, message = '', data = {}) => {
    res.status(code).json({
        status: code,
        message,
        data
    });
}

module.exports = {
    ErrorResponse,
    SuccessResponse
}