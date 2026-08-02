/* global IntersectionObserverCallback, IntersectionObserverEntry */
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '../useActiveSection';

describe('useActiveSection', () => {
  const sectionIds = ['home', 'projects', 'experience'];
  let observedElements: HTMLElement[];
  let observerCallback: IntersectionObserverCallback;
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    observedElements = sectionIds.map(id => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
      return el;
    });

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          disconnect: mockDisconnect,
          unobserve: jest.fn(),
          takeRecords: () => [],
          root: null,
          rootMargin: '',
          thresholds: [],
        };
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('defaults to the first section id before any intersection fires', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));
    expect(result.current).toBe('home');
  });

  it('observes every matching section element', () => {
    renderHook(() => useActiveSection(sectionIds));
    expect(mockObserve).toHaveBeenCalledTimes(3);
  });

  it('updates to the intersecting section', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[1],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('projects');
  });

  it('picks the section furthest down the page when multiple intersect', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[0],
          } as IntersectionObserverEntry,
          {
            isIntersecting: true,
            target: observedElements[2],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('experience');
  });

  it('ignores entries that are not intersecting', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[1],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });
    expect(result.current).toBe('projects');

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: false,
            target: observedElements[2],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    // No section is intersecting in this callback batch — stays on the last known active one.
    expect(result.current).toBe('projects');
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(sectionIds));
    unmount();
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
