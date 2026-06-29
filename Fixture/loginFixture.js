import {test as base} from '@playwright/test';

export const test = base.extend({
    login: async ({ page }, use) => {

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await page.locator("#username").fill("rahulshettyacademy");
        await page.locator("#password").fill("Learning@830$3mK2");
        await page.locator("#signInBtn").click();

        await page.waitForLoadState();
        await use(page);
    },


    adminLogin: async ({ page }, use) => {

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await page.locator("#username").fill("rahulshettyacademy");
        await page.locator("#password").fill("Learning@830$3mK2");
        await page.locator("#signInBtn").click();

        await page.waitForLoadState();
        await use(page);
    }
})
