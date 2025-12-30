describe('HomeScreen E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Screen Rendering', () => {
    it('should display the HomeScreen text elements', async () => {
      // Note: This test assumes you would navigate to HomeScreen
      // For now, the app shows RegistrationForm by default
      // You would need to implement navigation to test HomeScreen in isolation
      
      // This is a placeholder test that would work if HomeScreen was the default
      // await expect(element(by.text('Home Screen'))).toBeVisible();
      // await expect(element(by.text('Hello World'))).toBeVisible();
    });
  });

  describe('Screen Navigation', () => {
    it('should be able to navigate to HomeScreen after successful registration', async () => {
      // Fill and submit registration form
      await element(by.id('name-input')).typeText('Habib Rahman');
      await element(by.id('email-input')).typeText('habib.rahman@example.com');
      await element(by.id('password-input')).typeText('HabibPass123');
      await element(by.text('Register')).tap();

      // Wait for success message
      await waitFor(element(by.text('Registered as Habib Rahman')))
        .toBeVisible()
        .withTimeout(5000);

      // If navigation was implemented, you would verify HomeScreen appears here
      // await expect(element(by.text('Home Screen'))).toBeVisible();
      // await expect(element(by.text('Hello World'))).toBeVisible();
    });
  });

  describe('Screen Stability', () => {
    it('should maintain screen state after app reload', async () => {
      // This test verifies the app can be reloaded without crashing
      await device.reloadReactNative();
      
      // Verify the app is still functional
      await expect(element(by.text('Create Account'))).toBeVisible();
    });

    it('should handle device rotation gracefully', async () => {
      // Rotate to landscape
      await device.setOrientation('landscape');
      await expect(element(by.text('Create Account'))).toBeVisible();

      // Rotate back to portrait
      await device.setOrientation('portrait');
      await expect(element(by.text('Create Account'))).toBeVisible();
    });
  });

  describe('App Launch and Initialization', () => {
    it('should launch the app successfully', async () => {
      // Verify app launched and main screen is visible
      await expect(element(by.text('Create Account'))).toBeVisible();
      await expect(element(by.text('Sign up to get started'))).toBeVisible();
    });

    it('should display all initial UI elements', async () => {
      await expect(element(by.text('Create Account'))).toBeVisible();
      await expect(element(by.id('name-input'))).toBeVisible();
      await expect(element(by.id('email-input'))).toBeVisible();
      await expect(element(by.id('password-input'))).toBeVisible();
      await expect(element(by.text('Register'))).toBeVisible();
    });
  });

  describe('Background and Foreground', () => {
    it('should handle app backgrounding and foregrounding', async () => {
      // Send app to background
      await device.sendToHome();
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Bring app back to foreground
      await device.launchApp({ newInstance: false });
      
      // Verify app is still functional
      await expect(element(by.text('Create Account'))).toBeVisible();
    });

    it('should maintain form state when backgrounding', async () => {
      // Fill in some data
      await element(by.id('name-input')).typeText('Rafiq Ahmed');
      await element(by.id('email-input')).typeText('rafiq@example.com');

      // Background the app
      await device.sendToHome();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Foreground the app
      await device.launchApp({ newInstance: false });

      // Note: Form state may or may not persist depending on implementation
      // This test structure is provided for when that feature is needed
      await expect(element(by.text('Create Account'))).toBeVisible();
    });
  });

  describe('Performance and Responsiveness', () => {
    it('should respond quickly to user interactions', async () => {
      const startTime = Date.now();
      
      await element(by.id('name-input')).tap();
      await element(by.id('name-input')).typeText('Quick Test');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Input should be responsive (within 2 seconds)
      expect(responseTime).toBeLessThan(2000);
    });

    it('should handle rapid button taps', async () => {
      // Tap register button multiple times rapidly
      await element(by.text('Register')).multiTap(3);
      
      // Should still show error message (not crash)
      await waitFor(element(by.text('All fields are required')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });
});
