const { By, until } = require('selenium-webdriver');


async function postComment(driver, newTweet) {
    try {
        await driver.get(`https://twitter.com/home`); 
        await driver.navigate().refresh(); 
        await driver.sleep(6000);
        
        const replyButton = await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='reply']")), 10000);
        await replyButton.click();

        const textArea = await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='tweetTextarea_0']")), 10000);
        await textArea.sendKeys(newTweet);

        const replyPostButton = await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='tweetButton']")), 10000);
        await replyPostButton.click();
 
        console.log('Comment posted successfully');
    } catch (err) {
        console.error(`POST COMMENT ERROR: ${err}`);
    }
}

module.exports = { postComment }