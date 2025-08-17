import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import ResponsiveImage from '../ResponsiveImage';

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

describe('ResponsiveImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.IntersectionObserver = mockIntersectionObserver;
    mockIntersectionObserver.mockReturnValue(mockObserver);
  });

  it('renders with basic props', () => {
    render(
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <ResponsiveImage
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
      <ResponsiveImage
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
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('loads image immediately when priority is true', () => {
    render(
      <ResponsiveImage
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
      <ResponsiveImage
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
      <ResponsiveImage
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
      <ResponsiveImage
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
      <ResponsiveImage
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

  it('generates srcSet for responsive images', () => {
    render(
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute(
      'srcSet',
      'https://example.com/image.jpg 1x, https://example.com/image.jpg 2x'
    );
  });

  it('uses custom sizes attribute', () => {
    render(
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={true}
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
  });

  it('observes element for intersection when priority is false', () => {
    render(
      <ResponsiveImage
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
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={true}
      />
    );

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(
      <ResponsiveImage
        src="https://example.com/image.jpg"
        alt="Test image"
        priority={false}
      />
    );

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});
