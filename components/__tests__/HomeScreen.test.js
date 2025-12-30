import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';
import HomeScreen from '../HomeScreen';

test('renders the Home Screen text', () => {
    const { getByText} = render(<HomeScreen />);
    expect(getByText('Home Screen')).toBeTruthy();
});

test('matches snapshot', () => {
    let component;
    act(() => {
        component = renderer.create(<HomeScreen />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});