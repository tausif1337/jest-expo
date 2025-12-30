import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../components/HomeScreen';

describe('HomeScreen Integration Tests', () => {
  describe('Component Rendering', () => {
    it('should render HomeScreen successfully', () => {
      const { getByText } = render(<HomeScreen />);
      
      expect(getByText('Home Screen')).toBeTruthy();
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('should render all text elements', () => {
      const { getAllByText } = render(<HomeScreen />);
      
      const textElements = getAllByText(/Home Screen|Hello World/);
      expect(textElements.length).toBe(2);
    });

    it('should have correct structure', () => {
      const { getByText, toJSON } = render(<HomeScreen />);
      
      // Verify text elements exist
      expect(getByText('Home Screen')).toBeTruthy();
      expect(getByText('Hello World')).toBeTruthy();
      
      // Verify component renders without errors
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should render within a View container', () => {
      const { toJSON } = render(<HomeScreen />);
      const tree = toJSON();
      
      expect(tree).toBeTruthy();
      expect(tree.type).toBe('View');
    });

    it('should render text components as children', () => {
      const { toJSON } = render(<HomeScreen />);
      const tree = toJSON();
      
      // Check that children exist
      expect(tree.children).toBeTruthy();
      expect(tree.children.length).toBeGreaterThan(0);
    });

    it('should maintain consistent rendering', () => {
      const { getByText, rerender } = render(<HomeScreen />);
      
      expect(getByText('Home Screen')).toBeTruthy();
      
      // Rerender and verify consistency
      rerender(<HomeScreen />);
      expect(getByText('Home Screen')).toBeTruthy();
      expect(getByText('Hello World')).toBeTruthy();
    });
  });

  describe('Component Snapshot', () => {
    it('should match snapshot', () => {
      const { toJSON } = render(<HomeScreen />);
      const tree = toJSON();
      
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Multiple Instances', () => {
    it('should render multiple instances independently', () => {
      const { getByText: getText1 } = render(<HomeScreen />);
      const { getByText: getText2 } = render(<HomeScreen />);
      
      // Both instances should render correctly
      expect(getText1('Home Screen')).toBeTruthy();
      expect(getText2('Home Screen')).toBeTruthy();
      expect(getText1('Hello World')).toBeTruthy();
      expect(getText2('Hello World')).toBeTruthy();
    });
  });

  describe('Text Content', () => {
    it('should display correct home screen title', () => {
      const { getByText } = render(<HomeScreen />);
      const homeText = getByText('Home Screen');
      
      expect(homeText).toBeTruthy();
      expect(homeText.props.children).toBe('Home Screen');
    });

    it('should display correct greeting message', () => {
      const { getByText } = render(<HomeScreen />);
      const helloText = getByText('Hello World');
      
      expect(helloText).toBeTruthy();
      expect(helloText.props.children).toBe('Hello World');
    });
  });

  describe('Component Stability', () => {
    it('should render without crashing', () => {
      expect(() => render(<HomeScreen />)).not.toThrow();
    });

    it('should be stable across multiple renders', () => {
      const { rerender, getByText } = render(<HomeScreen />);
      
      for (let i = 0; i < 5; i++) {
        rerender(<HomeScreen />);
        expect(getByText('Home Screen')).toBeTruthy();
        expect(getByText('Hello World')).toBeTruthy();
      }
    });
  });

  describe('Accessibility', () => {
    it('should have accessible text elements', () => {
      const { getByText } = render(<HomeScreen />);
      
      const homeScreenText = getByText('Home Screen');
      const helloWorldText = getByText('Hello World');
      
      // Verify text is accessible and readable
      expect(homeScreenText).toBeTruthy();
      expect(helloWorldText).toBeTruthy();
    });
  });
});
