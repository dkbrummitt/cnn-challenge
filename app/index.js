//const twClient = require('../components/twitter');
const feedController = require('./features/feed');

const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const methodOverride = require('method-override');
const winston = require('winston');
const router = express.Router();

//create the express application
const app = express();

/**
 * Handles run-time errors during request processing. Currently results in 500
 * error for all requets.
 *
 * @param {object} err The error thrown during request handling
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 * @param {function} next Call back function, that executes next step in
 * processing chain.
 */
handleError = (err, request, response, next) => {
  winston.error({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: 'handleError',
    'err': err
  });

  /*
  winston.debug({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: 'handleError',
    'request': request,
    'response': response,
  });
  /* // */
  response.status(500).send('something bad happened!');
};

/**
 * Handle a basic get request
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 */
handleBasicRequest = (request, response) => {

  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: 'handleBasicRequest'
  });
  var count = parseInt(request.query.count) || 5;
  var topic = request.query.topic || 'cnnbrk';

  if (typeof topic === 'object') {
    feedController.getFeeds(topic, count, function mycb(data) {
      feedController.getLimits(function (limits) {
        try {
          data.limits = limits.resources.search['/search/tweets'];
          response.json({
            feed: data
          });
        } catch (err) {
          winston.error({
            timestamp: new Date().toISOString(),
            pid: process.pid,
            file: __filename,
            method: 'handleBasicRequest[feedController.getLimits RESPONSE HANDLER]',
            'err': err
          });
        }
      });
    });
  } else {
    feedController.getFeed(topic, count, function mycb(data) {
      // callback then respond
      feedController.getLimits(function (limits) {
        try {
          data.limits = limits.resources.search['/search/tweets'];
          response.json({
            feed: data
          });
        } catch (err) {
          winston.error({
            timestamp: new Date().toISOString(),
            pid: process.pid,
            file: __filename,
            method: 'handleBasicRequest[feedController.getLimits RESPONSE HANDLER]',
            'err': err
          });
        }
      });
    });
  }
};

/**
 * Middleware function to customize any ubiquitous response headers
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 * @param {function} next Call back function, that executes next middleware in
 * processing chain.
 */
customizeHeaders = (request, response, next) => {
  app.disable('x-powered-by');
  response.setHeader('X-Powered-By', 'You');

  next();
};

/**
 * Middleware function to add CORS support
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 * @param {function} next Call back function, that executes next step in
 * processing chain.
 */
cors = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*'); //make API public
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

// Add middle ware to customize response headers
app.use(customizeHeaders);
app.use(cors);
// Add Middleware needed for RESTful API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

//Define routes and Error Handling
app.get('/feed', handleBasicRequest);
app.use(handleError);

//export the app
module.exports = app;
