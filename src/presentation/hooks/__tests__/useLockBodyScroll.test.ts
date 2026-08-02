import { renderHook } from '@testing-library/react';
import { useLockBodyScroll } from '../useLockBodyScroll';

describe('useLockBodyScroll', () => {
  beforeEach(() => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('locks body scroll via position: fixed when isLocked is true', () => {
    renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
  });

  it('does not lock body scroll when isLocked is false', () => {
    renderHook(() => useLockBodyScroll(false));

    expect(document.body.style.position).toBe('');
  });

  it('unlocks body scroll and restores scroll position on unmount', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 240,
      writable: true,
      configurable: true,
    });

    const { unmount } = renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.top).toBe('-240px');

    unmount();

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.width).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 240);
  });

  it('unlocks body scroll when isLocked toggles from true to false', () => {
    const { rerender } = renderHook(
      ({ isLocked }) => useLockBodyScroll(isLocked),
      { initialProps: { isLocked: true } }
    );

    expect(document.body.style.position).toBe('fixed');

    rerender({ isLocked: false });

    expect(document.body.style.position).toBe('');
  });
});
