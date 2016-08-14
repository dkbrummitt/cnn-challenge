const twitter = require('twitter');
const config = require('../../config');

//connect to twitter
const twClient = new twitter(config.twitter);
var feedsData = {};
var rateCount = 0;

getFeed = (topic, numTweets, callback) => {
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
      return console.error(err);
    }

    feedsData[query] = data;
    callback(feedsData);
  });
};

rateLimits = (callback) => {
  twClient.get('application/rate_limit_status.json', {}, function (err, data,
    response) {
    callback(data);
  });
};

twClient.getFeed = getFeed;
twClient.rateLimits = rateLimits;
module.exports = twClient;
