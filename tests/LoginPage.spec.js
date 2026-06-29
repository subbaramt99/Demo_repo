import {test, expect} from '@playwright/test';
import LoginPage from '../Pages/LoginPage';

test.describe.serial('Login Page Test Suite', () => {
    
    test('Test the login functionality with valid credentials', async({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.loginToApplication("rahulshettyacademy", "Learning@830$3mK2");

        await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
        const title = await page.title();
        console.log("Title of the page:", title);
        expect(title).toBe("ProtoCommerce");

    });

    test('Test the login functionality with invalid credentials', async({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.loginToApplication("invalidUser", "invalidPassword");

        await page.waitForSelector("div.alert.alert-danger strong");
        const errorMessage = await loginPage.errorMessage();
        expect(errorMessage).toContain("Incorrect");

    });

    test('Test the login functionality with empty credentials', async({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.loginToApplication("         ", "     ");

        await page.waitForSelector("div.alert.alert-danger strong");
        const errorMessage = await loginPage.errorMessage();
        expect(errorMessage).toContain("Incorrect");

    });

    test.only('Test the login functionality with login type', async({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.loginType("user");
        await loginPage.loginToApplication("rahulshettyacademy", "Learning@830$3mK2");

        await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
        const title = await page.title();
        console.log("Title of the page:", title);
        expect(title).toBe("ProtoCommerce");

    });

    tes
});