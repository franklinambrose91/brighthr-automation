# BrightHR Employee Tests

Playwright tests for the BrightHR sandbox employee-management assessment. The test signs in, adds two employees with generated details, and checks that both appear in the employee list. Page interactions are kept in small page-object classes under `pages/`.

## Run locally

1. Install dependencies and Chromium:
   ```bash
   npm ci
   npx playwright install chromium
   ```

2. Copy `.env.example` to `.env` and set `TEST_USERNAME` and `TEST_PASSWORD` to the sandbox account credentials. `.env` is ignored by Git.

3. Run the tests with `npx playwright test`.

Use `npx playwright test --headed` to watch the browser, or `npx playwright show-report` to open the HTML report.

## GitHub Actions

The workflow runs on pushes and pull requests targeting `main`. Add `TEST_USERNAME` and `TEST_PASSWORD` as repository Actions secrets. Each run uploads the HTML report as the `playwright-report` artifact, including when the test fails.