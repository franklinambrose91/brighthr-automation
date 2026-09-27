import { Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToEmployees() {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('a[href="/employee-hub"]').click();
    }


}