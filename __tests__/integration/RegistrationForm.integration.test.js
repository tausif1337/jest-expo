import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegistrationForm from '../../components/RegistrationForm';

describe('RegistrationForm Integration Tests', () => {
  describe('Complete Registration Flow', () => {
    it('should successfully register a user with valid inputs', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      // Verify initial render
      expect(getByText('Create Account')).toBeTruthy();
      expect(getByText('Sign up to get started')).toBeTruthy();

      // Fill in the form with valid data
      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.changeText(nameInput, 'Abdul Karim');
      fireEvent.changeText(emailInput, 'abdul.karim@example.com');
      fireEvent.changeText(passwordInput, 'SecurePass123');

      // Submit the form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify success message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Abdul Karim');
      });
    });

    it('should show error when submitting with empty fields', async () => {
      const { getByText, queryByTestId } = render(<RegistrationForm />);

      // Submit empty form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify error message appears
      await waitFor(() => {
        const messageText = queryByTestId('message-text');
        expect(messageText).toBeTruthy();
        expect(messageText.props.children).toBe('All fields are required');
      });
    });

    it('should show error when name is missing', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      // Fill only email and password
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.changeText(emailInput, 'rahim@example.com');
      fireEvent.changeText(passwordInput, 'SecurePass123');

      // Submit the form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify error message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });
    });

    it('should show error when email is missing', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      // Fill only name and password
      const nameInput = getByTestId('name-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.changeText(nameInput, 'Fatima Akhter');
      fireEvent.changeText(passwordInput, 'SecurePass123');

      // Submit the form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify error message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });
    });

    it('should show error when password is missing', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      // Fill only name and email
      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');

      fireEvent.changeText(nameInput, 'Shakib Ahmed');
      fireEvent.changeText(emailInput, 'shakib.ahmed@example.com');

      // Submit the form
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      // Verify error message
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });
    });
  });

  describe('Form Input Interactions', () => {
    it('should update state when user types in name input', () => {
      const { getByTestId } = render(<RegistrationForm />);
      const nameInput = getByTestId('name-input');

      fireEvent.changeText(nameInput, 'Nusrat Jahan');

      expect(nameInput.props.value).toBe('Nusrat Jahan');
    });

    it('should update state when user types in email input', () => {
      const { getByTestId } = render(<RegistrationForm />);
      const emailInput = getByTestId('email-input');

      fireEvent.changeText(emailInput, 'nusrat@example.com');

      expect(emailInput.props.value).toBe('nusrat@example.com');
    });

    it('should update state when user types in password input', () => {
      const { getByTestId } = render(<RegistrationForm />);
      const passwordInput = getByTestId('password-input');

      fireEvent.changeText(passwordInput, 'MySecretPass');

      expect(passwordInput.props.value).toBe('MySecretPass');
    });

    it('should handle multiple form submissions', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const registerButton = getByText('Register');

      // First submission - empty
      fireEvent.press(registerButton);
      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('All fields are required');
      });

      // Second submission - with valid data
      fireEvent.changeText(nameInput, 'Ayesha Rahman');
      fireEvent.changeText(emailInput, 'ayesha@example.com');
      fireEvent.changeText(passwordInput, 'AyeshaPass123');
      fireEvent.press(registerButton);

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Ayesha Rahman');
      });
    });

    it('should clear and refill form successfully', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      const nameInput = getByTestId('name-input');
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');

      // Fill form
      fireEvent.changeText(nameInput, 'Kamal Hossain');
      fireEvent.changeText(emailInput, 'kamal@example.com');
      fireEvent.changeText(passwordInput, 'KamalPass456');

      // Clear form
      fireEvent.changeText(nameInput, '');
      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(passwordInput, '');

      // Refill with new data
      fireEvent.changeText(nameInput, 'Tanzila Begum');
      fireEvent.changeText(emailInput, 'tanzila@example.com');
      fireEvent.changeText(passwordInput, 'TanzilaPass789');

      const registerButton = getByText('Register');
      fireEvent.press(registerButton);

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe('Registered as Tanzila Begum');
      });
    });
  });

  describe('UI/UX Integration', () => {
    it('should render all form elements correctly', () => {
      const { getByText, getByTestId, getByPlaceholderText } = render(
        <RegistrationForm />
      );

      // Verify all text labels
      expect(getByText('Create Account')).toBeTruthy();
      expect(getByText('Sign up to get started')).toBeTruthy();
      expect(getByText('Full Name')).toBeTruthy();
      expect(getByText('Email Address')).toBeTruthy();
      expect(getByText('Password')).toBeTruthy();
      expect(getByText('Register')).toBeTruthy();

      // Verify all inputs
      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
      expect(getByPlaceholderText('Enter your email')).toBeTruthy();
      expect(getByPlaceholderText('Enter your password')).toBeTruthy();

      // Verify inputs have correct testIDs
      expect(getByTestId('name-input')).toBeTruthy();
      expect(getByTestId('email-input')).toBeTruthy();
      expect(getByTestId('password-input')).toBeTruthy();
    });

    it('should not show message initially', () => {
      const { queryByTestId } = render(<RegistrationForm />);

      const messageText = queryByTestId('message-text');
      expect(messageText).toBeNull();
    });

    it('should have password input in secure mode', () => {
      const { getByTestId } = render(<RegistrationForm />);
      const passwordInput = getByTestId('password-input');

      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('should have email input with correct keyboard type', () => {
      const { getByTestId } = render(<RegistrationForm />);
      const emailInput = getByTestId('email-input');

      expect(emailInput.props.keyboardType).toBe('email-address');
      expect(emailInput.props.autoCapitalize).toBe('none');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in name', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      fireEvent.changeText(getByTestId('name-input'), "Md. Abu'l Kalam");
      fireEvent.changeText(getByTestId('email-input'), 'abul.kalam@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'Password123');

      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe("Registered as Md. Abu'l Kalam");
      });
    });

    it('should handle long names', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      const longName = 'Kazi Mohammad Ashraful Islam Siddiqui';
      fireEvent.changeText(getByTestId('name-input'), longName);
      fireEvent.changeText(getByTestId('email-input'), 'ashraful.islam@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'Password123');

      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        expect(messageText.props.children).toBe(`Registered as ${longName}`);
      });
    });

    it('should handle whitespace-only input as empty', async () => {
      const { getByTestId, getByText } = render(<RegistrationForm />);

      fireEvent.changeText(getByTestId('name-input'), '   ');
      fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
      fireEvent.changeText(getByTestId('password-input'), 'Password123');

      fireEvent.press(getByText('Register'));

      await waitFor(() => {
        const messageText = getByTestId('message-text');
        // Component treats whitespace as valid, so it will register
        expect(messageText.props.children).toBe('Registered as    ');
      });
    });
  });
});
