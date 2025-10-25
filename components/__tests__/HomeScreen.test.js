import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

test('renders the Home Screen text', () => {
    const { getByText} = render(<HomeScreen />);
    expect(getByText('Home Screen')).toBeTruthy();
});

test('matches snapshot', () => {
    const tree = render(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});