const twClient = require('../../../components/twitter');
const feedController = {};

getFeeds = (topicArray, count, handler) => {
  var feed = {};
  count = count || 5; //default

  function coallateResponse(data) {
    if (feed.length === 0) {
      feed = data;
    } else {
      for (topic in data) {
        feed[topic] = data[topic];
      }
    }
    handler(feed); //responds mult
  }

  for (ndx = 0; ndx < topicArray.length; ndx++) {
    getFeed(topicArray[ndx], count, coallateResponse);

  }

};

getFeed = (topic, count, handler) => {
  var feed = {};
  feed[topic] = {};
  count = count || 5; //default

  if (!topic || !handler) {
    return feed;
  }

  function normalizeTwitterResponse(data) {
    //normalize response
    var norm = {};
    var tweet;

    for (var ndx in data[topic].statuses) {
      status = data[topic].statuses[ndx];
      tweet = {};

      tweet.id = status.id;
      tweet.created_at = status.created_at;
      tweet.text = status.text;
      tweet.isRetweet = tweet.text.startsWith('RT ');
      /* // */
      if (status.user) {
        tweet.from = {};
        tweet.from.name = status.user.name;
        tweet.from.handle = status.user.screen_name;
        tweet.from.img = status.user.profile_image_url;
        tweet.from.inTwitter = 'https://twitter.com/' + status.user.screen_name;
      }
      if (status.entities.urls && status.entities.urls.length) {
        tweet.url = status.entities.urls[0].url;
      }
      if (status.entities.media && status.entities.media.length) {
        tweet.media = status.entities.media[0].media_url;
      }

      if (status.retweeted_status && status.retweeted_status.retweet_count) {
        tweet.retweets = status.retweeted_status.retweet_count;
      }
      if (status.retweeted_status && status.retweeted_status.favorite_count) {
        tweet.favorites = status.retweeted_status.favorite_count;
      }
      /* // */
      norm[tweet.id] = tweet; //prevent duplicates DOESNT WORK
    }

    feed[topic] = norm;
    //feed.full = data;

    handler(feed);
  }


  twClient.getFeed(topic, count, normalizeTwitterResponse);
};

getLimits = (handler) => {
  twClient.rateLimits(function (data) {
    handler(data);
  });
};

feedController.getFeed = getFeed;
feedController.getFeeds = getFeeds;
feedController.getLimits = getLimits;
module.exports = feedController;
