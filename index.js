const { monitorTweets } = require('./tweetMonitor');

(async () => {
    await monitorTweets();
})();



