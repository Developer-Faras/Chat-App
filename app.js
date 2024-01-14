// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { NotFoundHandler, ServerErrorHandler } = require('./middlewares/common/ErrorHandler');
const LoginRouter = require('./routers/LoginRouter');
const UserRouter = require('./routers/UserRouter');
const InboxRouter = require('./routers/InboxRouter');



// Create App Object
const app = express();
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err));

// Set View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Set Body Perser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set Cookie Perser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routers
app.use('/', LoginRouter);
app.use('/users', UserRouter);
app.use('/inbox', InboxRouter);


// Error Handlers
app.use(NotFoundHandler);
app.use(ServerErrorHandler);

// App Listen
app.listen(process.env.SERVER_PORT, () => {
    console.log(`App Running On Url: http://localhost:${process.env.SERVER_PORT}`);
});