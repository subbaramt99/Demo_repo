import { test as base} from '@playwright/test';
import { PracticePage } from '../Pages/PracticePage';


export const test = base.extend({
    PracticePage: async ({ page }, use) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        await use( new PracticePage(page));
    }
})