import React from "react";
import renderer from "react-test-renderer";
import { act } from 'react-test-renderer';
import RegistrationForm from "../RegistrationForm";

test("matches snapshot", () => {
  let component;
  act(() => {
    component = renderer.create(<RegistrationForm />);
  });
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
