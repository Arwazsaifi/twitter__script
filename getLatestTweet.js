const { By, until } = require('selenium-webdriver');


async function getLatestTweet(driver) {
    try {
        const tweetElement = await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='tweetText']")), 20000);
        return await tweetElement.getText();
    } catch (err) {
        console.error(`GET LATEST TWEET ERROR: ${err}`);
        return null; 
    }
}

module.exports = { getLatestTweet }