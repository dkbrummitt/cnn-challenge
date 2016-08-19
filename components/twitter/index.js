const twitter = require('twitter');
const winston = require('winston');
const config = require('../../config');

//connect to twitter
const twClient = new twitter(config.twitter);
var feedsData = {};
var rateCount = 0;

handleTwitterResponse = (args) => {
  if (args.err) {
    winston.error({
      timestamp: new Date().toISOString(),
      pid: process.pid,
      file: __filename,
      method: "handleTwitterResponse",
      err: err
    });
    args.callback(args.err);
  } else {
    args.callback(args.feedsData);
  }
};

getFeed = (topic, numTweets, callback) => {
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: "getFeed",
    argv: [topic, numTweets]
  });

  rateCount++;
  if (feedsIdx = 0) {
    feedsData = {};
  }
  var feeds = [topic];
  var feedsIdx = 0;

  var query = feeds[feedsIdx];
  /* // */
  twClient.get('search/tweets', {
    q: query,
    lang: 'en',
    count: numTweets
  }, function (err, data, response) {
    if (err) {
      callback(err);
      winston.error({
        timestamp: new Date().toISOString(),
        pid: process.pid,
        file: __filename,
        method: "twClient.get[RESPONSE HANDLER]",
        'err': err
      });

      winston.debug({
        timestamp: new Date().toISOString(),
        pid: process.pid,
        file: __filename,
        method: "twClient.get[RESPONSE HANDLER]",
        'data': data,
        'response': response,

      });

      return console.error(err);
    }

    feedsData[query] = data;
    callback(feedsData);
  });
};

rateLimits = (callback) => {
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: "rateLimits"
  });
  twClient.get('application/rate_limit_status.json', {}, function (err, data,
    response) {
    callback(data);
  });
};

trendingWorldWide = (callback) => {
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: "trendingWorldWide"
  });
  twClient.get('trends/place.json', {
    id: 1
  }, function (err, data,
    response) {
    callback(data);
  });
};

trendingByWoeID = (woeid, callback) => {
  winston.info({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    file: __filename,
    method: "trendingByWoeID"
  });
  twClient.get('trends/place.json', {
    id: woeid
  }, function (err, data,
    response) {
    callback(data);
  });
};

twClient.getFeed = getFeed;
twClient.rateLimits = rateLimits;
twClient.trendingByWoeID = trendingByWoeID;
twClient.trendingWorldWide = trendingWorldWide;
module.exports = twClient;
