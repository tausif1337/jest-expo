import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RegistrationForm from "../src/RegistrationForm";

test("shows error when fields are empty", () => {
  const { getByText, getByTestId } = render(<RegistrationForm />);

  fireEvent.press(getByText("Register"));

  expect(getByTestId("message-text").props.children).toBe(
    "All fields are required"
  );
});

test("shows success message when filled", () => {
  const { getByText, getByTestId } = render(<RegistrationForm />);

  fireEvent.changeText(getByTestId("name-input"), "Alex");
  fireEvent.changeText(getByTestId("email-input"), "alex@test.com");
  fireEvent.changeText(getByTestId("password-input"), "123456");

  fireEvent.press(getByText("Register"));

  expect(getByTestId("message-text").props.children).toBe("Registered as Alex");
});
