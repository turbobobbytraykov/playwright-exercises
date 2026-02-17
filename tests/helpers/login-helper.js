const { test } = require('@playwright/test');

/**
 * Reusable login helper function
 * Performs login with provided credentials and captures screenshot
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} email - User email
 * @param {string} password - User password
 */
async function performLogin(page, email, password) {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Fill in email
  const emailInput = page.locator('input#userEmail');
  await emailInput.waitFor({ state: 'visible' });
  await emailInput.fill(email);
  
  // Fill in password
  const passwordInput = page.locator('input#userPassword');
  await passwordInput.fill(password);
  
  // Capture screenshot before login
  const screenshot = await page.screenshot();
  await test.info().attach('Before Login', {
    body: screenshot,
    contentType: 'image/png',
  });
  
  // Click login button
  const loginButton = page.locator('input[type="submit"]#login');
  await loginButton.click();
  
  // Wait for navigation
  await page.waitForLoadState('networkidle');
}

module.exports = { performLogin };
