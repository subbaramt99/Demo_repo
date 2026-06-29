import { test } from '@playwright/test';

export class PracticePage {

    constructor(page){
        this.page = page;
    }

    async webTable(){
        const courses = await this.page.locator("//table[@name='courses']/tbody/tr/td[2]");
        return courses;
    }

    async dynamicDropdown(countryName){
        await this.page.fill('#autocompletes', countryName);
    }


}