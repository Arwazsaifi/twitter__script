const { By, until } = require('selenium-webdriver');
require('dotenv').config();


async function loginTwitter(driver) {
    try{
    await driver.get('https://twitter.com/login');

    const usernameInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div/main/div/div/div/div[2]/div[2]/div/div[5]/label/div/div[2]/div/input')), 10000);
    await usernameInput.sendKeys(process.env.USER_NAME); 

    const nextButton = await driver.findElement(By.xpath('//*[@id="react-root"]/div/div/div/main/div/div/div/div[2]/div[2]/div/div[6]'));
    await nextButton.click();

    const passwordInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div/main/div/div/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div/label/div/div[2]/div[1]/input')), 10000);
    await passwordInput.sendKeys(process.env.PASSWORD); 

    const loginButton = await driver.findElement(By.xpath('//div[@data-testid="LoginForm_Login_Button"]'));
    await loginButton.click();

    await driver.wait(until.urlContains('twitter.com/home'), 10000); 
    }catch(e){
        console.error(e,"error detected")
    }
}

module.exports = { loginTwitter };
