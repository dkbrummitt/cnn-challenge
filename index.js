const favicon = require('serve-favicon');

const APP = require('./app');
const PORT = process.env.PORT || 7000;

initApplication = (err) => {
  if (err) {
    console.log('Houston, we have a problem.\n', err);
    throw err;
  }
  console.log('Listening on', PORT);
};

APP.use(favicon(__dirname + '/public/favicon.ico'));
APP.listen(PORT, initApplication);
