// Dependencies
const express = require('express');
const { GetLoginPage } = require('../middlewares/handlers/LoginHandler');
const HtmlResponse = require('../middlewares/common/HtmlResponse');

// Router
const LoginRouter = express.Router();

// Routes
LoginRouter.get('/', HtmlResponse('Login'), GetLoginPage);











// Exports
module.exports = LoginRouter;