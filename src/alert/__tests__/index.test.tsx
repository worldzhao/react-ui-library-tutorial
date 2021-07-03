import React from 'react';
import { render } from '@testing-library/react';
import Alert from '..';

describe('<Alert />', () => {
  test('should render default', () => {
    const { container } = render(<Alert>default</Alert>);
    expect(container).toMatchSnapshot();
  });

  test('should render alert with type', () => {
    const kinds: any[] = ['info', 'warning', 'positive', 'negative'];

    const { getByText } = render(
      <>
        {kinds.map(k => (
          <Alert kind={k} key={k}>
            {k}
          </Alert>
        ))}
      </>,
    );

    kinds.forEach(k => {
      expect(getByText(k)).toMatchSnapshot();
    });
  });
});
