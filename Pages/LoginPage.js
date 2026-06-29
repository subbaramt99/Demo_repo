import {test, expect} from '@playwright/test';

class LoginPage {

    constructor(page){
        this.page = page;
        // this.username = page.locator("#username");
        // this.password = page.locator("#password");
        // this.signInBtn = page.locator("#signInBtn");
    }

    async navigateToLoginPage(){
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async loginToApplication(username, password){
        await this.page.fill("#username", username);
        await this.page.fill("#password", password);
        await this.page.click("#signInBtn");
    }

    async loginType(type){
        if(type === "user"){
            await this.page.locator(`//input[@value="${type}"]`).click();
            await this.page.locator("button[id='cancelBtn']").click();
        }else{
            await this.page.locator(`//input[@value="${type}"]`).click();
        }
        
    }

    async userType(type){
        await this.page.selectOption("select.form-control", type);  // CSS selector
    }

    async termsAndConditions(){
        await this.page.locator("#terms").check();
    }

    async errorMessage(){
        const errorMessage = await this.page.locator("div.alert.alert-danger strong").textContent();
        console.log("Error Message:", errorMessage);
        return errorMessage;
    }

}

export default LoginPage;