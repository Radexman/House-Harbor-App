import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import Heading from './Heading';

describe('Heading component should', () => {
  test('render correctly', () => {
    render(<Heading />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('House Harbor');
  });
});
