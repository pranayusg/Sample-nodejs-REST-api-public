require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');
const logger = require('./src/lib/logger');
const morganMiddleware = require('./src/middlewares/morgan.middleware');
const demorequests = require('./src/routes/demoRequests.route');
const covidRoutes = require('./src/routes/covid.route');
const usersRoutes = require('./src/routes/users.route');

const app = express();

app.use(cors());
app.set('trust proxy', 1);
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/demorequests', demorequests);
app.use('/covid', covidRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send(
    `<h1>Welcome to my Sample Nodejs Rest API</h1> 
    <a href="http://localhost:3000/api-docs/">Visit API DOCS</a>`
  );
});

/* app.use((req, res, next) => {
  const error = new Error('Something went wrong');
  next(error);
}); */

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
  logger.error(
    `Error message: ${error.message},Req details: ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

module.exports = app;
