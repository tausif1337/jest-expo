import React from "react";
import renderer from "react-test-renderer";
import RegistrationForm from "../RegistrationForm";

test("matches snapshot", () => {
  const tree = renderer.create(<RegistrationForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
