import { test } from '../Fixture/loginFixture';

//test.describe('Fixtures and hooks', () => {   
    // test.beforeEach(async ({page}) => {
    //     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //     console.log("This will execute before each test");
    // });

    // test('Test the login functionality', async({ page }) => {
    //     await page.locator("#username").fill("rahulshettyacademy");
    //     await page.locator("#password").fill("Learning@830$3mK2");
    //     await page.locator("#signInBtn").click();

    //     await page.waitForLoadState();
    //     const title = await page.title();
    //     console.log("Title of the page:", title);
    //     expect(title).toBe("ProtoCommerce");

    // });

    test('Test the product iphone', async({ login }) => {
        // await page.locator("#username").fill("rahulshettyacademy");
        // await page.locator("#password").fill("Learning@830$3mK2");
        // await page.locator("#signInBtn").click();

        // await page.waitForLoadState();
        // const title = await page.title();
        // console.log("Title of the page:", title);
        // expect(title).toBe("ProtoCommerce");

        const products = await login.locator("//div[@class = 'card h-100']");

        for(let i=0; i< await products.count(); i++){
            const productName = await products.nth(i).locator("/div/h4/a").textContent();
            console.log("Product Name:", productName);

            if(productName === "iphone X"){
                await products.nth(i).locator("/div/button").click();
                break;
            }
        }

    });

    test('Test the product Samsung Note 8', async({ login }) => {

        const products = await login.locator("//div[@class = 'card h-100']");

        for(let i=0; i< await products.count(); i++){
            const productName = await products.nth(i).locator("/div/h4/a").textContent();
            console.log("Product Name:", productName);

            if(productName === "Samsung Note 8"){
                await products.nth(i).locator("/div/button").click();
                break;
            }
        }

    });


//});