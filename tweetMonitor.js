const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { loginTwitter } = require('./twitterLogin');
const { postComment } = require('./postComment');
const { getLatestPosts } = require('./myPosts');
const { getLatestTweet } = require('./getLatestTweet');


async function monitorTweets() {
    let options = new chrome.Options();
    options.windowSize({ width: 600, height: 812 });
    // options.headless();

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await loginTwitter(driver);
        let lastTweet = await getLatestTweet(driver);


        while (true) {
            try {
                await driver.navigate().refresh();
                let newTweet = await getLatestTweet(driver);

                if (newTweet !== lastTweet) {
                    console.log(`NEW TWEET DETECTED`);
                    lastTweet = newTweet;
                } else {
                    console.log(`NO NEW TWEET`);
                }

                let links = await getLatestPosts(driver);

                if (links.length > 0) {
                    const randomLink = links[Math.floor(Math.random() * links.length)];
                    await driver.sleep(6000);
                    await postComment(driver, randomLink);
                }
                await driver.sleep(6000)
                let tweetElements = await driver.findElements(By.xpath("//*[@data-testid='tweetText']"));
                for (let i = 0; i < tweetElements.length; i++) {
                    try {
                        tweetElements = await driver.findElements(By.xpath("//*[@data-testid='tweetText']"));
                        if (tweetElements[i]) {
                            await tweetElements[i].click();
                            await driver.sleep(5000);
                            await driver.navigate().back();
                            await driver.sleep(5000);
                        }
                    } catch (err) {
                        console.error(`ERROR CLICKING TWEET: ${err}`);
                        tweetElements = await driver.findElements(By.xpath("//*[@data-testid='tweetText']"));
                    }
                }
            } catch (err) {
                console.error(`LOOP ERROR: ${err}`);
            }
            await driver.sleep(5000);
        }
    } catch (err) {
        console.error(`MAIN ERROR: ${err}`);
    } finally {
        await driver.quit();
    }
}



module.exports = { monitorTweets };









