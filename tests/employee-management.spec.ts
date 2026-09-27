import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeesPage } from '../pages/EmployeesPage';

test.describe('Employee Management Scenarios', () => {
    
    // Generate dynamic data for two employees to avoid CI data collisions
    const emp1 = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number()
    };
    
    const emp2 = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number()
    };

    test('Add and verify multiple employees successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const employeesPage = new EmployeesPage(page);

        // Fetch secure credentials
        const username = process.env.TEST_USERNAME;
        const password = process.env.TEST_PASSWORD;
        if (!username || !password) {
            throw new Error('Set TEST_USERNAME and TEST_PASSWORD to run this test.');
        }

        await test.step('Login to BrightHR Sandbox', async () => {
            await loginPage.navigate();
            await loginPage.login(username, password);
        });

        await test.step('Scenario 1: Navigate to employees and add first employee', async () => {
            await dashboardPage.navigateToEmployees();
            await employeesPage.clickAddEmployee();
            await employeesPage.fillEmployeeDetails(emp1.firstName, emp1.lastName, emp1.email, emp1.phone);
            await employeesPage.saveEmployee();
        });

         await test.step('Scenario 2: Add second employee', async () => {
            await employeesPage.clickAddAnotherEmployee();
            await employeesPage.fillEmployeeDetails(emp2.firstName, emp2.lastName, emp2.email, emp2.phone);
            await employeesPage.saveEmployee();
            await employeesPage.clickClose();
        });

        await test.step('Scenario 3: Verify both employees display in the list', async () => {
            await dashboardPage.navigateToEmployees();
            await employeesPage.verifyEmployeeVisible(emp1.firstName, emp1.lastName);
            await employeesPage.verifyEmployeeVisible(emp2.firstName, emp2.lastName);
        });
    });
});