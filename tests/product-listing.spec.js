const { test, expect } = require('@playwright/test');
const { TEST_USER } = require('./test-data');
const { performLogin } = require('./helpers/login-helper');

test.describe('Product Listing Tests', () => {
  test('should validate the first product on dashboard', async ({ page }) => {
    // Login using helper function
    await performLogin(page, TEST_USER.email, TEST_USER.password);
    
    // Verify on dashboard page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    
    // Wait for products to load
    const products = page.locator('.card-body');
    await products.first().waitFor({ state: 'visible' });
    
    // Verify there are 3 products listed
    await expect(products).toHaveCount(3);
    
    // Verify the name of the first product
    const firstProductName = products.first().locator('b');
    await expect(firstProductName).toHaveText('ADIDAS ORIGINAL');
  });
});
