const { By } = require('selenium-webdriver');


async function getLatestPosts(driver) {
    let postLinks = [];
    try {
        await driver.get(`https://twitter.com/${process.env.USER_NAME}`); 
        await driver.sleep(5000);
        let tweetElements = await driver.findElements(By.xpath("//article[@data-testid='tweet']"));
        for (let i = 0; i < Math.min(5, tweetElements.length); i++) {
            let linkElement = await tweetElements[i].findElement(By.xpath(".//a[contains(@href, '/status/')]"));
            let link = await linkElement.getAttribute('href');
            postLinks.push(link);
        }
    } catch (err) {
        console.error(`ERROR FETCHING POSTS: ${err}`);
    }
    return postLinks;
}


module.exports = {getLatestPosts}