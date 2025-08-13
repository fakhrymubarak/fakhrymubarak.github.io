import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import LazyImage from '../LazyImage';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ ...props }: any) => <img {...props} />,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
};

describe('LazyImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.IntersectionObserver = mockIntersectionObserver;
    mockIntersectionObserver.mockReturnValue(mockObserver);
  });

  it('renders with basic props', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        className="custom-class"
        priority={true}
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with placeholder when provided', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        placeholder="https://example.com/placeholder.jpg"
        priority={true}
      />
    );

    const placeholderImg = screen.getByAltText('');
    expect(placeholderImg).toHaveAttribute(
      'src',
      'https://example.com/placeholder.jpg'
    );
  });

  it('renders loading spinner when no placeholder is provided', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('loads image immediately when priority is true', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchPriority', 'high');
  });

  it('loads image lazily when priority is false', async () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    // Simulate intersection to trigger image rendering
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    // Wait for the image to be rendered after intersection
    await waitFor(() => {
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('fetchPriority', 'auto');
    });
  });

  it('calls onLoad callback when image loads', () => {
    const onLoad = jest.fn();
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        onLoad={onLoad}
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    act(() => {
      fireEvent.load(img);
    });

    expect(onLoad).toHaveBeenCalled();
  });

  it('calls onError callback when image fails to load', () => {
    const onError = jest.fn();
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        onError={onError}
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    act(() => {
      fireEvent.error(img);
    });

    expect(onError).toHaveBeenCalled();
  });

  it('renders error state when image fails to load', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    act(() => {
      fireEvent.error(img);
    });

    expect(screen.getByText('Image failed to load')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('observes element for intersection when priority is false', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );
  });

  it('does not observe element when priority is true', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('handles null element ref gracefully', () => {
    // Mock IntersectionObserver to not be called when element ref is null
    const originalIntersectionObserver = global.IntersectionObserver;
    global.IntersectionObserver = jest.fn().mockReturnValue({
      observe: jest.fn(),
      disconnect: jest.fn(),
    });

    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    // The observer should still be created but observe might not be called
    // This is expected behavior when the ref is not immediately available
    expect(global.IntersectionObserver).toHaveBeenCalled();

    // Restore original
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('updates image opacity when loaded', async () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');

    // Initially opacity should be 0
    expect(img).toHaveClass('opacity-0');

    // After loading, opacity should be 100
    act(() => {
      fireEvent.load(img);
    });

    await waitFor(() => {
      expect(img).toHaveClass('opacity-100');
    });
  });

  it('handles optional callbacks gracefully', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');

    // Should not throw when callbacks are undefined
    expect(() => {
      act(() => {
        fireEvent.load(img);
        fireEvent.error(img);
      });
    }).not.toThrow();
  });

  it('maintains error state after error occurs', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    act(() => {
      fireEvent.error(img);
    });

    // Error state should persist
    expect(screen.getByText('Image failed to load')).toBeInTheDocument();

    // Image should not be visible in error state
    expect(img).not.toBeInTheDocument();
  });

  it('handles intersection observer callback correctly', async () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    // Initially image should not be rendered
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();

    // Simulate intersection
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    // Image should be rendered after intersection
    await waitFor(() => {
      expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });
  });

  it('handles non-intersecting entries', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    act(() => {
      observerCallback([{ isIntersecting: false }]);
    });

    // Image should not be rendered when not intersecting
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });
});
