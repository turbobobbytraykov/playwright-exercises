const { test, expect } = require('@playwright/test');
const { TEST_USER } = require('./test-data');
const { performLogin } = require('./helpers/login-helper');

test.describe('Login Tests', () => {
  test('should successfully login with registered credentials', async ({ page }) => {
    // Perform login using helper function
    await performLogin(page, TEST_USER.email, TEST_USER.password);
    
    // Verify redirected to dashboard
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    
    // Verify page title
    await expect(page).toHaveTitle("Let's Shop");
  });
});
