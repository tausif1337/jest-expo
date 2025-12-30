# Detox E2E Testing Setup

## Overview
This directory contains End-to-End (E2E) tests using Detox for the React Native Expo application. E2E tests simulate real user interactions with the app to ensure all features work together correctly.

## Test Files
- `RegistrationForm.e2e.test.js` - E2E tests for registration form flows
- `HomeScreen.e2e.test.js` - E2E tests for app launch, navigation, and screen stability
- `jest.config.js` - Jest configuration for Detox
- `init.js` - Detox initialization setup

## Prerequisites

### iOS Testing
1. **Xcode** installed on macOS
2. **iOS Simulator** running
3. **Expo CLI** installed globally: `npm install -g expo-cli`

### Android Testing
1. **Android Studio** installed
2. **Android Emulator** set up (Pixel_7_API_34 recommended)
3. **Java Development Kit (JDK)** installed

## Running E2E Tests

### iOS Tests
```bash
# Build the app for iOS
npm run e2e:build:ios

# Run E2E tests on iOS
npm run e2e:test:ios

# Or run both build and test
npm run e2e:ios
```

### Android Tests
```bash
# Build the app for Android
npm run e2e:build:android

# Run E2E tests on Android
npm run e2e:test:android

# Or run both build and test
npm run e2e:android
```

## Test Coverage

### RegistrationForm E2E Tests (13 test cases)
1. **Complete User Registration Flow**
   - Successful registration with valid credentials
   - Error handling for empty fields
   - Error handling for missing name, email, or password

2. **Form Input Interactions**
   - Typing in name, email, and password fields
   - Clearing and refilling form

3. **Multiple Registration Attempts**
   - Handling failed and successful submissions

4. **Special Characters and Long Names**
   - Bangladeshi names with special characters (e.g., "Md. Abu'l Kalam")
   - Long Bangladeshi names

5. **UI Element Visibility**
   - All form elements display correctly
   - Message visibility states

6. **Form Scrolling**
   - Scrolling through the form

### HomeScreen E2E Tests (9 test cases)
1. **Screen Rendering**
   - Display of screen elements

2. **Screen Navigation**
   - Navigation after successful registration

3. **Screen Stability**
   - Maintaining state after app reload
   - Handling device rotation

4. **App Launch and Initialization**
   - Successful app launch
   - Initial UI elements display

5. **Background and Foreground**
   - App backgrounding and foregrounding
   - Form state persistence

6. **Performance and Responsiveness**
   - Quick response to user interactions
   - Handling rapid button taps

## Test Data
All E2E tests use **Bangladeshi names and details** following the project's localization standards:
- Rahman Abdullah
- Habib Rahman
- Sadia Sultana
- Kamrul Islam
- Farhan Ahmed
- Tahsin Rahman
- Nadia Haque
- Rashed Khan
- Md. Abu'l Kalam Azad
- Kazi Mohammad Ashraful Islam Siddiqui
- Rafiq Ahmed

## Configuration Files

### `.detoxrc.js` (Root Directory)
Detox configuration for iOS and Android builds, devices, and test configurations.

### `e2e/jest.config.js`
Jest configuration specific to E2E tests with Detox environment and reporters.

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure Xcode or Android Studio is properly installed
   - Check that simulator/emulator is running
   - Verify build paths in `.detoxrc.js`

2. **Test Timeouts**
   - Increase timeout in `jest.config.js` (default: 120000ms)
   - Check device performance

3. **Element Not Found**
   - Verify testID attributes in components
   - Check element visibility timing with `waitFor()`

4. **App Crashes**
   - Check React Native logs
   - Verify Metro bundler is running
   - Review error messages in Detox output

### Debug Mode
Run tests with verbose output:
```bash
detox test --configuration ios.sim.debug --loglevel trace
```

## Best Practices
1. **Use testID** for reliable element selection
2. **Wait for elements** using `waitFor()` with timeout
3. **Clean up** after each test with `beforeEach` hooks
4. **Keep tests independent** - each test should work in isolation
5. **Use descriptive test names** that explain what is being tested

## CI/CD Integration
For continuous integration, use:
```bash
npm run e2e:build:ios && npm run e2e:test:ios
```

Ensure emulator/simulator is available in CI environment.

## Further Reading
- [Detox Documentation](https://wix.github.io/Detox/)
- [Detox with Expo](https://docs.expo.dev/build-reference/e2e-tests/)
- [Jest Configuration](https://jestjs.io/docs/configuration)
