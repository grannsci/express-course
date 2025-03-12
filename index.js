import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
//routers
import userRouter from './routers/user.router.js';
import locationRouter from './routers/location.router.js';

//const express = require('express');
const app = express();
const port = 8080;

//routers imports
//const userRouter = require('./routers/user.router.js');
//middlware imports
//const logger = require('./middleware/logger.js');
//const notFound = require('./middleware/notFound.js');
//const errorHandler = require('./middleware/errorHandler.js');
//const bodyParser = require('body-parser'); //body-parser is a middleware that parses the request body

//middleware wire up
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
//helmet and morgan middleware are already avaiable to import in node

app.use('/users', userRouter);
app.use('/locations', locationRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});