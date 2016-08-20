const favicon = require('serve-favicon');
const express = require('express');
const winston = require('winston');
const APP = require('./app');
const PORT = process.env.PORT || 7000;

initApplication = (err) => {
  if (err) {
    winston.error({
      timestamp: new Date().toISOString(),
      pid: process.pid,
      file: __filename,
      method: 'initApplication',
      'err': err
    });

    throw err;
  }
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: 'initApplication',
    message: 'Listening',
    port: PORT
  });
};

APP.use('/js', express.static(__dirname + '/public/js'));
APP.use('/libs', express.static(__dirname + '/public/libs'));
APP.use('/css', express.static(__dirname + '/public/css'));
APP.use('/img', express.static(__dirname + '/public/img'));
// route to handle all angular requests
/* //
APP.get('*', function (req, res) {
  res.sendfile('./public/index.html'); // load our public/index.html file
});
/* // */
APP.get('/*', function (req, res) {
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: 'APP.get',
    'message': 'rendering...'
  });
  res.sendFile('index.html', {
    root: __dirname + '/public'
  });
});
APP.listen(PORT, initApplication);
