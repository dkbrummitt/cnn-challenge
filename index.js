const favicon = require('serve-favicon');
const express = require('express');
const APP = require('./app');
const PORT = process.env.PORT || 7000;

initApplication = (err) => {
  if (err) {
    console.log('Houston, we have a problem.\n', err);
    throw err;
  }
  console.log('Listening on', PORT);
  console.log('in directory ', __dirname);
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
  res.sendFile('index.html', {
    root: __dirname + '/public'
  });
});
APP.listen(PORT, initApplication);
