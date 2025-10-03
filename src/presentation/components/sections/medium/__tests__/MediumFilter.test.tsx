import { fireEvent, render, screen } from '@testing-library/react';
import MediumFilter from '../MediumFilter';

describe('MediumFilter', () => {
  it('renders filters and handles filter change', () => {
    const onFilterChange = jest.fn();
    render(
      <MediumFilter
        filters={['react', 'testing']}
        activeFilter="react"
        onFilterChange={onFilterChange}
      />
    );

    expect(screen.getByText('Filter Articles')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /all articles/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /react/i })).toHaveClass(
      'bg-primary-coral'
    );

    fireEvent.click(screen.getByRole('button', { name: /testing/i }));
    expect(onFilterChange).toHaveBeenCalledWith('testing');
  });
});
