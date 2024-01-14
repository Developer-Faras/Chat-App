// Dependenciew
const express = require('express');
const { GetUserPage } = require('../middlewares/handlers/UserHandler');
const HtmlResponse = require('../middlewares/common/HtmlResponse');

// Router
const UserRouter = express.Router();

// Routes
UserRouter.get('/', HtmlResponse('Login'), GetUserPage);











// Exports
module.exports = UserRouter;
