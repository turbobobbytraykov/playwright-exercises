const { test, expect } = require('@playwright/test');
const { TEST_USER, MESSAGES } = require('./test-data');

test.describe('Registration Tests', () => {
  test('should successfully register a new user', async ({ page }) => {
    // Navigate directly to the registration page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    
    // Wait for the page to load and the form to be visible
    await page.waitForLoadState('networkidle');
    
    // Fill in First Name
    const firstNameInput = page.locator('input#firstName');
    await firstNameInput.waitFor({ state: 'visible' });
    await firstNameInput.fill(TEST_USER.firstName);
    
    // Fill in Last Name
    const lastNameInput = page.locator('input#lastName');
    await lastNameInput.fill(TEST_USER.lastName);
    
    // Fill in Email
    const emailInput = page.locator('input#userEmail');
    await emailInput.fill(TEST_USER.email);
    
    // Fill in Phone Number
    const phoneInput = page.locator('input#userMobile');
    await phoneInput.fill(TEST_USER.phone);
    
    // Select Occupation from dropdown
    const occupationDropdown = page.locator('select.custom-select');
    await occupationDropdown.selectOption({ label: TEST_USER.occupation });
    
    // Select Gender (Male)
    const genderRadio = page.locator(`input[value="${TEST_USER.gender}"]`);
    await genderRadio.check();
    
    // Fill in Password
    const passwordInput = page.locator('input#userPassword');
    await passwordInput.fill(TEST_USER.password);
    
    // Fill in Confirm Password
    const confirmPasswordInput = page.locator('input#confirmPassword');
    await confirmPasswordInput.fill(TEST_USER.password);
    
    // Check the "I am 18 year or Older" checkbox
    const ageCheckbox = page.locator('input[type="checkbox"]');
    await ageCheckbox.check();
    
    // Click the Register button
    const registerButton = page.locator('input[type="submit"][value="Register"]');
    await registerButton.click();
    
    // Wait for navigation and page reload
    await page.waitForLoadState('networkidle');
    
    // Capture screenshot before validation
    const screenshot = await page.screenshot();
    await test.info().attach('Registration Success Page', {
      body: screenshot,
      contentType: 'image/png',
    });
    
    // Verify "Account Created Successfully" message is displayed
    const successMessage = page.locator(`text=${MESSAGES.accountCreated}`);
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    
    // Verify Login button is displayed
    const loginButton = page.locator('button.btn-primary:has-text("Login")');
    await expect(loginButton).toBeVisible();
    
    // Capture final screenshot after all validations
    const finalScreenshot = await page.screenshot();
    await test.info().attach('Final State After All Validations', {
      body: finalScreenshot,
      contentType: 'image/png',
    });
  });
});
