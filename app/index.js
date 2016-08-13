const config = require('../config');

const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const methodOverride = require('method-override');
var twitter = require('twitter');

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
  console.log('Houston, we have a problem:', err);
  console.log('typeof err', (typeof err));
  console.log('typeof request', (typeof request));
  console.log('typeof response', (typeof response));
  console.log('typeof next', (typeof next));

  response.status(500).send('something bad happened!');
};

/**
 * Handle a basic get request
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 */
handleBasicRequest = (request, response) => {
  response.json({
    message: "Whuz upper from ?"
  });
};

/**
 * Middleware function to customize any ubiquitous response headers
 * @param {object} request The HTTP request recieved from client
 * @param {object} response The HTTP response that will be sent to client
 * @param {function} next Call back function, that executes next step in
 * processing chain.
 */
customizeHeaders = (request, response, next) => {
  app.disable('x-powered-by');
  response.setHeader('X-Powered-By', 'You');

  next();
};


// Add middle ware to customize response headers
app.use(customizeHeaders);

// Add Middleware needed for RESTful API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

//Define routes and Error Handling
app.get('/', handleBasicRequest);
app.use(handleError);

//export the app
module.exports = app;
