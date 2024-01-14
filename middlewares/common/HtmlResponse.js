// Decorate Html Response

const HtmlResponse = (pageTitle) => {
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
        next();
    }
}

module.exports = HtmlResponse;