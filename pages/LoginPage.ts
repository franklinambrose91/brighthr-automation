import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        // Relies on the baseURL set in playwright.config.ts
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async login(username: string, password: string) {
        const emailInput = this.page.locator('input[name="username"]');
        const passwordInput = this.page.locator('input[name="password"]');
        const submitButton = this.page.locator('button[type="submit"]');

        // Wait for the inputs to be visible before interacting
        await emailInput.waitFor({ state: 'visible' });
        
        await emailInput.fill(username);
        await passwordInput.fill(password);
        await submitButton.click();
    }
}