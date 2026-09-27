import { Page, expect } from '@playwright/test';

export class EmployeesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickAddEmployee() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Add Employee' }).click();
    }
    async clickAddAnotherEmployee() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Add another employee' }).click();
    }
        async clickClose() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Close modal' }).click();
    }
    async fillEmployeeDetails(firstName: string, lastName: string, email: string, phone: string) {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('input[name="firstName"]').fill(firstName);
        await this.page.locator('input[name="lastName"]').fill(lastName);
        await this.page.locator('input[name="email"]').fill(email);
        await this.page.locator('input[name="phoneNumber"]').fill(phone); // Optional field requirement
    }

    async saveEmployee() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.getByText('Success! New employee added')).toBeVisible();
    }
        async verifyEmployeeVisible(firstName: string, lastName: string) {
        const fullName = `${firstName} ${lastName}`;
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText(fullName, { exact: true })).toBeVisible();
    }
}