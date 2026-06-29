import {test, expect} from '@playwright/test';

test.describe('Elements handling', () => {   
    // test.beforeEach(async ({ page }) => {
    //     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //     expect(page).toHaveTitle(/Practice Page/);
    // });

    test('Handle the dynamic dropdowns', async({ page }) => {

        // await page.locator(".inputs ui-autocomplete-input").type("ind");
        await page.fill('#autocomplete', 'am');

        const dropdownOptions = await page.locator(".ui-menu-item-wrapper");
        const count = await dropdownOptions.count();

        for(let i=0; i<count; i++){
            const country = await dropdownOptions.nth(i).textContent();
            console.log("Country:", country);
            if(country === "Panama"){
                await dropdownOptions.nth(i).click();
                break;
            }   
        }

        expect(await page.locator('#autocomplete')).toHaveValue('Panama');
    });


    test('Handle the static dropdowns', async({ page }) => {
        //await page.selectOption('#dropdown-class-example', {value: 'option2'});  // Select by value
        //await page.selectOption('#dropdown-class-example', {index: 3});  // Select by index
        await page.selectOption('#dropdown-class-example', {'label': 'Option1'}); // Select by visible text

        const selectedOption = await page.locator('#dropdown-class-example').inputValue();
        console.log("Selected option value:", selectedOption);

        expect(selectedOption).toBe('option1');
    });

    test('Handling frames', async({ page }) => {
        const frame = page.frameLocator('#courses-iframe');
        await frame.locator("a[href*='mentorship']").first().click();  // //a[@href='mentorship'] --> Xpath

        const text = await frame.locator("div[class='inner-box'] h1").textContent();  // //div[@class='inner-box']/h1 --> Xpath
        console.log("Text from the frame:", text);

        expect(text).toContain('Mentorship');
    });

    test('Handling alerts', async({ page }) => {
        page.on('dialog', dialog => {
            console.log("Dialog message:", dialog.message());
            dialog.dismiss();

            expect(dialog.message()).toContain('Umar');
        });

        //page.locator("#alertbtn").click();
        await page.locator("#name").fill("Umar");
        await page.locator("#confirmbtn").click();


        //expect(page.locator("#name")).toHaveValue('Umar');
    });

    test('Handling child windows', async({ page }) => {

        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.screenshot({ path: 'test-results/newWindow.png' }, { fullPage: true }),
            page.locator('#openwindow').click()
        ]);

        await newPage.waitForLoadState();

        expect(newPage.url()).toContain('qaclickacademy');
        
        await newPage.screenshot({ path: 'test-results/getDomain.png' }),
        await newPage.locator("text='Get This Domain'").click();
        await newPage.waitForLoadState();
        await newPage.screenshot({ path: 'test-results/goDaddy.png' });
        expect(newPage.url()).toContain('godaddy');

    });

    test('Handling file upload', async({ page }) => {

        await page.goto('https://practice.expandtesting.com/upload');

        const filePath = 'E:/Subbaram/Playwright project/Project 1/files/dummy.txt.txt'; // Replace with the actual file path you want to upload


        await page.setInputFiles('#fileInput', filePath);
        await page.waitForSelector('#fileInput');
        await page.screenshot({ path: 'test-results/fileUpload.png' }, { fullPage: true });
        await page.locator('#fileSubmit').click();
        await page.screenshot({ path: 'test-results/fileSubmit.png' }, { fullPage: true });
    });


    test('Handling file download', async({ browser }) => {

        const context = await browser.newContext({
            acceptDownloads: true
        });

        const page = await context.newPage();

        await page.goto('https://practice.expandtesting.com/download');

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator("//a[contains(@href, '1781718187629')]").click()
        ]);

        const savePath = 'files/exported.txt';	// Save file to disk
        await download.saveAs(savePath);
        const path = await download.path();	// Optional: get the download path
        console.log('Downloaded file path:', path);
    });


    // afterEach(async ({ page }, testInfo) => {
 	//     if (testInfo.status !== testInfo.expectedStatus) {
   	//     await page.screenshot({ path: `screenshots/failure-${testInfo.title}.png` });
 	//  }
	// });
});