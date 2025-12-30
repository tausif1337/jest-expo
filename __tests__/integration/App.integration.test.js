import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';

describe('App Integration Tests', () => {
  describe('Component Rendering', () => {
    it('should render the App component successfully', () => {
      const { getByText } = render(<App />);
      
      // App renders RegistrationForm, so check for form elements
      expect(getByText('Create Account')).toBeTruthy();
      expect(getByText('Sign up to get started')).toBeTruthy();
    });

    it('should render RegistrationForm within App', () => {
      const { getByTestId, getByText } = render(<App />);
      
      // Verify all form inputs are present
      expect(getByTestId('name-input')).toBeTruthy();
      expect(getByTestId('email-input')).toBeTruthy();
      expect(getByTestId('password-input')).toBeTruthy();
      expect(getByText('Register')).toBeTruthy();
    });
  });

  describe('Full Application Flow', () => {
    it('should complete full registration workflow from App level', async () => {
      const { getByTestId, getByText } = render(<App />);

      // Interact with the registration form
      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'testuser@example.com');
      fireEvent.changeText(passwordInput, 'TestPassword123');

      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify registration success message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Test User');
      });
    });

    it('should handle form validation at App level', async () => {
      const { getByText, queryByTestId } = render(<App />);

      // Try to submit empty form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify error message appears
      await waitFor(() => {
        const messageText = queryByTestId('message-text');
        expect(messageText).toBeTruthy();
        expect(messageText.props.children).toBe('All fields are required');
      });
    });

    it('should maintain state across multiple interactions', async () => {
      const { getByTestId, getByText } = render(<App />);

      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const registerButton = getByText('Register');

      // First attempt - incomplete
      fireEvent.changeText(nameInput, 'John');
      fireEvent.press(registerButton);

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });

      // Complete the form
      fireEvent.changeText(emailInput, 'john@example.com');
      fireEvent.changeText(passwordInput, 'JohnPass123');
      fireEvent.press(registerButton);

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as John');
      });

      // Verify name is still in state
      expect(nameInput.props.value).toBe('John');
    });
  });

  describe('Component Integration', () => {
    it('should properly integrate all form elements', () => {
      const { getByText, getByPlaceholderText } = render(<App />);

      // Verify main title
      expect(getByText('Create Account')).toBeTruthy();
      
      // Verify labels
      expect(getByText('Full Name')).toBeTruthy();
      expect(getByText('Email Address')).toBeTruthy();
      expect(getByText('Password')).toBeTruthy();
      
      // Verify inputs by placeholder
      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
      expect(getByPlaceholderText('Enter your email')).toBeTruthy();
      expect(getByPlaceholderText('Enter your password')).toBeTruthy();
      
      // Verify button
      expect(getByText('Register')).toBeTruthy();
    });

    it('should handle form submission properly', async () => {
      const { getByTestId, getByText } = render(<App />);

      // Fill all fields
      fireEvent.changeText(getByTestId('name-input'), 'Integration Test');
      fireEvent.changeText(getByTestId('email-input'), 'integration@test.com');
      fireEvent.changeText(getByTestId('password-input'), 'IntegrationPass');

      // Submit
      fireEvent.press(getByText('Register'));

      // Verify success
      await waitFor(() => {
        expect(getByTestId('message-text')).toBeTruthy();
      });
    });
  });

  describe('User Experience Flow', () => {
    it('should provide feedback for incomplete registration', async () => {
      const { getByTestId, getByText, queryByTestId } = render(<App />);

      // Initially no message
      expect(queryByTestId('message-text')).toBeNull();

      // Submit without filling
      fireEvent.press(getByText('Register'));

      // Error message appears
      await waitFor(() => {
        expect(queryByTestId('message-text')).toBeTruthy();
      });
    });

    it('should allow user to retry registration after error', async () => {
      const { getByTestId, getByText } = render(<App />);

      // First attempt - fail
      fireEvent.press(getByText('Register'));
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });

      // Second attempt - success
      fireEvent.changeText(getByTestId('name-input'), 'Retry User');
      fireEvent.changeText(getByTestId('email-input'), 'retry@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'RetryPass123');
      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Retry User');
      });
    });

    it('should handle rapid form submissions', async () => {
      const { getByTestId, getByText } = render(<App />);

      const registerButton = getByText('Register');

      // Multiple rapid clicks
      fireEvent.press(registerButton);
      fireEvent.press(registerButton);
      fireEvent.press(registerButton);

      // Should still show error message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });
    });
  });

  describe('Input Validation Integration', () => {
    it('should accept valid email formats', async () => {
      const { getByTestId, getByText } = render(<App />);

      fireEvent.changeText(getByTestId('name-input'), 'Email Test');
      fireEvent.changeText(getByTestId('email-input'), 'valid.email+tag@example.co.uk');
      fireEvent.changeText(getByTestId('password-input'), 'Password123');
      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Email Test');
      });
    });

    it('should handle password with special characters', async () => {
      const { getByTestId, getByText } = render(<App />);

      fireEvent.changeText(getByTestId('name-input'), 'Special Pass User');
      fireEvent.changeText(getByTestId('email-input'), 'special@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'P@ssw0rd!#$%');
      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Special Pass User');
      });
    });
  });
});
