const express = require('express')
const app = express();
const cors = require('cors')
var morgan = require('morgan')
// var bodyParser = require('body-parser') bodyParser.urlencoded(optional)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const demorequests = require('./api/routes/demorequests')
const covidRoutes = require('./api/routes/covid')
const coronaRoutes = require('./api/routes/corona')
const usersRoutes = require('./api/routes/users')
const amazonRoutes = require('./api/routes/amazon')

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/demorequests', demorequests);
app.use('/covid', covidRoutes);
app.use('/corona', coronaRoutes);
app.use('/users', usersRoutes);
app.use('/amazon', amazonRoutes);

app.use((req, res, next) => {
    const error = new Error('Please visit https://sample-nodejs-rest-api.herokuapp.com/api-docs/ for API documentation');
    next(error)
});
app.use((error, req, res, next) => {
    res.status(400).json({
            message: error.message
    })
});

module.exports = app;