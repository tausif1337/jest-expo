describe('RegistrationForm E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Complete User Registration Flow', () => {
    it('should successfully register a user with valid credentials', async () => {
      // Verify the registration form is visible
      await expect(element(by.text('Create Account'))).toBeVisible();
      await expect(element(by.text('Sign up to get started'))).toBeVisible();

      // Fill in the registration form with Bangladeshi user data
      await element(by.id('name-input')).typeText('Rahman Abdullah');
      await element(by.id('email-input')).typeText('rahman.abdullah@gmail.com');
      await element(by.id('password-input')).typeText('SecurePass@123');

      // Submit the form
      await element(by.text('Register')).tap();

      // Verify success message appears
      await waitFor(element(by.id('message-text')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Registered as Rahman Abdullah'))).toBeVisible();
    });

    it('should show error when submitting with empty fields', async () => {
      // Verify form is visible
      await expect(element(by.text('Create Account'))).toBeVisible();

      // Try to submit without filling any fields
      await element(by.text('Register')).tap();

      // Verify error message appears
      await waitFor(element(by.id('message-text')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('All fields are required'))).toBeVisible();
    });

    it('should show error when name is missing', async () => {
      // Fill only email and password
      await element(by.id('email-input')).typeText('nazma@example.com');
      await element(by.id('password-input')).typeText('Password123');

      // Submit the form
      await element(by.text('Register')).tap();

      // Verify error message
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should show error when email is missing', async () => {
      // Fill only name and password
      await element(by.id('name-input')).typeText('Sadia Sultana');
      await element(by.id('password-input')).typeText('Password123');

      // Submit the form
      await element(by.text('Register')).tap();

      // Verify error message
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should show error when password is missing', async () => {
      // Fill only name and email
      await element(by.id('name-input')).typeText('Kamrul Islam');
      await element(by.id('email-input')).typeText('kamrul.islam@example.com');

      // Submit the form
      await element(by.text('Register')).tap();

      // Verify error message
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Form Input Interactions', () => {
    it('should allow typing in name input field', async () => {
      const nameInput = element(by.id('name-input'));
      
      await nameInput.tap();
      await nameInput.typeText('Farhan Ahmed');
      
      // Verify input has text (by attempting to clear it)
      await nameInput.clearText();
      await expect(nameInput).toBeVisible();
    });

    it('should allow typing in email input field', async () => {
      const emailInput = element(by.id('email-input'));
      
      await emailInput.tap();
      await emailInput.typeText('farhan@example.com');
      
      await emailInput.clearText();
      await expect(emailInput).toBeVisible();
    });

    it('should allow typing in password input field', async () => {
      const passwordInput = element(by.id('password-input'));
      
      await passwordInput.tap();
      await passwordInput.typeText('MySecretPassword');
      
      await passwordInput.clearText();
      await expect(passwordInput).toBeVisible();
    });

    it('should handle clearing and refilling the form', async () => {
      // Fill the form
      await element(by.id('name-input')).typeText('Tahsin Rahman');
      await element(by.id('email-input')).typeText('tahsin@example.com');
      await element(by.id('password-input')).typeText('TahsinPass123');

      // Clear all fields
      await element(by.id('name-input')).clearText();
      await element(by.id('email-input')).clearText();
      await element(by.id('password-input')).clearText();

      // Refill with new data
      await element(by.id('name-input')).typeText('Nadia Haque');
      await element(by.id('email-input')).typeText('nadia.haque@example.com');
      await element(by.id('password-input')).typeText('NadiaPass456');

      // Submit
      await element(by.text('Register')).tap();

      // Verify success
      await waitFor(element(by.text('Registered as Nadia Haque')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Multiple Registration Attempts', () => {
    it('should handle multiple failed and successful submissions', async () => {
      // First attempt - empty form (should fail)
      await element(by.text('Register')).tap();
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);

      // Second attempt - partial data (should fail)
      await element(by.id('name-input')).typeText('Rashed Khan');
      await element(by.text('Register')).tap();
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);

      // Third attempt - complete data (should succeed)
      await element(by.id('email-input')).typeText('rashed.khan@example.com');
      await element(by.id('password-input')).typeText('RashedPass789');
      await element(by.text('Register')).tap();
      await waitFor(element(by.text('Registered as Rashed Khan')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Special Characters and Long Names', () => {
    it('should handle Bangladeshi names with special characters', async () => {
      await element(by.id('name-input')).typeText("Md. Abu'l Kalam Azad");
      await element(by.id('email-input')).typeText('abul.kalam@example.com');
      await element(by.id('password-input')).typeText('Password@123');

      await element(by.text('Register')).tap();

      await waitFor(element(by.text("Registered as Md. Abu'l Kalam Azad")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should handle long Bangladeshi names', async () => {
      const longName = 'Kazi Mohammad Ashraful Islam Siddiqui';
      
      await element(by.id('name-input')).typeText(longName);
      await element(by.id('email-input')).typeText('ashraful.islam@example.com');
      await element(by.id('password-input')).typeText('Password@123');

      await element(by.text('Register')).tap();

      await waitFor(element(by.text(`Registered as ${longName}`)))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('UI Element Visibility', () => {
    it('should display all form elements correctly', async () => {
      // Verify title and subtitle
      await expect(element(by.text('Create Account'))).toBeVisible();
      await expect(element(by.text('Sign up to get started'))).toBeVisible();

      // Verify labels
      await expect(element(by.text('Full Name'))).toBeVisible();
      await expect(element(by.text('Email Address'))).toBeVisible();
      await expect(element(by.text('Password'))).toBeVisible();

      // Verify inputs are present
      await expect(element(by.id('name-input'))).toBeVisible();
      await expect(element(by.id('email-input'))).toBeVisible();
      await expect(element(by.id('password-input'))).toBeVisible();

      // Verify button
      await expect(element(by.text('Register'))).toBeVisible();
    });

    it('should not show message initially', async () => {
      // Message should not be visible on initial load
      await expect(element(by.id('message-text'))).not.toBeVisible();
    });
  });

  describe('Form Scrolling', () => {
    it('should be able to scroll through the form', async () => {
      // Scroll down to ensure all elements are accessible
      await element(by.id('password-input')).scrollTo('bottom');
      await expect(element(by.text('Register'))).toBeVisible();

      // Scroll back up
      await element(by.id('name-input')).scrollTo('top');
      await expect(element(by.text('Create Account'))).toBeVisible();
    });
  });
});
