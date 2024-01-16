// Dependenciew
const express = require('express');
const { GetUserPage, AddNewUser, AvatarUpload } = require('../middlewares/handlers/UserHandler');
const HtmlResponse = require('../middlewares/common/HtmlResponse');
const { AddUserValidator, AddUserValidationErrorHandler } = require('../middlewares/validators/AddUserValidator');

// Router
const UserRouter = express.Router();

// Routes
UserRouter.get('/', HtmlResponse('Login'), GetUserPage);

// Create User
UserRouter.post('/', AvatarUpload, AddUserValidator, AddUserValidationErrorHandler, AddNewUser);









// Exports
module.exports = UserRouter;
