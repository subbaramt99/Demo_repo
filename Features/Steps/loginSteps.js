const { Given, When, Then, And, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {chromium} = require('playwright');

setDefaultTimeout(30000);
let browser;
let context;
let page;

Given('launch the application', async function(){

    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
})

When('I enter valid credentials', async function () {
  await page.fill("#username", 'rahulshettyacademy');
  await page.fill("#password", 'Learning@830$3mK2');
});

When('I enter invalid credentials', async function () {
  await page.fill("#username", 'invalid');
  await page.fill("#password", 'invalid@830$3mK2');
});

When('I click the login button', async function () {
    await page.click("#signInBtn")
});

Then('I should be redirected to the dashboard page', async function () {
   await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
        const title = await page.title();
        console.log("Title of the page:", title);
        expect(title).toBe("ProtoCommerce");
});

when('When I enter admin credentials', async function(){
  await page.fill("#username", 'adminuser');
  await page.fill("#password", 'adminuser@830$3mK2');
})