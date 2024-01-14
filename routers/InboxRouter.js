// Dependenciew
const express = require('express');
const { GetInboxPage } = require('../middlewares/handlers/InboxHandler');
const HtmlResponse = require('../middlewares/common/HtmlResponse');

// Router
const InboxRouter = express.Router();

// Routes
InboxRouter.get('/', HtmlResponse('Login'), GetInboxPage);











// Exports
module.exports = InboxRouter;
