const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const swaggerDocument = require('./src/docs/swagger.json');
const logger = require('./src/lib/logger');
const morganMiddleware=require('./src/middlewares/morgan.middleware');
require('dotenv').config()

const demorequests = require('./src/routes/demoRequests.route')
const covidRoutes = require('./src/routes/covid.route')
const usersRoutes = require('./src/routes/users.route')
const app = express();

app.use(cors())
// app.use(morgan('dev'));
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/demorequests', demorequests);
app.use('/covid', covidRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Please visit https://sample-nodejs-rest-api.herokuapp.com/api-docs/ for API documentation');
    next(error)
});

app.use((error, req, res, next) => {
    res.status(400).json({
            message: error.message
    })
    logger.error(`Error message: ${error.message},Error message: ${req.originalUrl} - ${req.method} - ${req.ip}`)
});

module.exports = app;