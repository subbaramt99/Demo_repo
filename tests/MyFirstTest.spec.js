import { test, expect } from '@playwright/test';


test.describe.parallel.only('My first test suite', () => {   


    test.beforeAll(async () => {
    console.log("This will execute before all the tests");
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    expect(page).toHaveTitle(/Practice Page/);
});

test('My first test with Radio Buttons', async({ page }) => {

    await page.locator("//input[@value='radio1']").click();  // Xpath
    await page.locator("text=Radio2").click();  // Text based selector
    // await page.locator("input[name='radioButton']").nth(2).click();
    const radioButton = await page.locator("input[name='radioButton']"); // CSS selector
    await radioButton.last().click();

    expect(radioButton.first()).toBeChecked();
});

test('Test the Check Boxes', async({ page }) => {

    await page.locator("#checkBoxOption1").check(); // ID
    // await page.pause();
    await page.locator("#checkBoxOption1").check();
    await page.locator('#checkBoxOption2').uncheck();

        const checkBoxOption3 = await page.locator('#checkBoxOption3');
        await page.check('#checkBoxOption3');
        await checkBoxOption3.uncheck();

        expect(checkBoxOption3).not.toBeChecked();

});

test('Test the popups', async({ page }) => {
    // await page.getByRole('textbox', { name: 'Enter Your Name'}).fill('ram');

    const textCheckbox = await page.locator("label[for='bmw']").textContent();

    const type = await page.locator("input[id='checkBoxOption1']").getAttribute('type');

    console.log("Text of the checkbox:", textCheckbox);
    console.log("Type of the checkbox:", type);

    const inputAlert = await page.getByPlaceholder('Enter Your Name');  // Role based selector
    await inputAlert.fill('Umar');

    await inputAlert.getInputValue().then(value => {
        console.log("Value entered in the input field:", value);
    });

    expect(await inputAlert).toHaveValue('Umar');
});

    test.afterEach(async ({ page }) => {
        await page.close();
    });

});


