import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {{compNameEN}} from '../index';

describe('<{{compNameEN}} />', () => {
  test('should render default', () => {
    const { container } = render(<{{compNameEN}} />);
    expect(container).toMatchSnapshot();
  });
});
