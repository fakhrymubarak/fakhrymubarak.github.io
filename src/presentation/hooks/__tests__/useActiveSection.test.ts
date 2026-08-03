/* global IntersectionObserverCallback, IntersectionObserverEntry */
import { renderHook, act, waitFor } from '@testing-library/react';
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
          } as unknown as IntersectionObserverEntry,
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
          } as unknown as IntersectionObserverEntry,
          {
            isIntersecting: true,
            target: observedElements[2],
          } as unknown as IntersectionObserverEntry,
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
          } as unknown as IntersectionObserverEntry,
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
          } as unknown as IntersectionObserverEntry,
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

  it('falls back to earlier visible section when a later section exits', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    // Both home and projects are intersecting
    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[0],
          } as unknown as IntersectionObserverEntry,
          {
            isIntersecting: true,
            target: observedElements[1],
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    // Active section should be projects (furthest down)
    expect(result.current).toBe('projects');

    // Projects exits the viewport; only this change is reported
    // (IntersectionObserver doesn't re-report home as still-intersecting)
    act(() => {
      observerCallback(
        [
          {
            isIntersecting: false,
            target: observedElements[1],
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    // Active section should fall back to home (still visible)
    expect(result.current).toBe('home');
  });

  it('observes sections that mount asynchronously after the initial synchronous pass (e.g. lazy-loaded sections)', async () => {
    // Only 'home' exists synchronously, simulating IntroSection (non-lazy)
    // mounting before Header's effect runs, while 'projects' and 'experience'
    // are still pending their lazy chunk load.
    document.body.innerHTML = '';
    const homeEl = document.createElement('div');
    homeEl.id = 'home';
    document.body.appendChild(homeEl);

    const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');

    const { result } = renderHook(() => useActiveSection(sectionIds));

    expect(mockObserve).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('home');

    // Simulate ProjectsSection's lazy chunk resolving and mounting into the DOM.
    const projectsEl = document.createElement('div');
    projectsEl.id = 'projects';
    document.body.appendChild(projectsEl);

    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalledTimes(2);
    });
    expect(mockObserve).toHaveBeenCalledWith(projectsEl);

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: projectsEl,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });
    expect(result.current).toBe('projects');

    // Simulate the last lazy section (ExperienceSection) mounting.
    const experienceEl = document.createElement('div');
    experienceEl.id = 'experience';
    document.body.appendChild(experienceEl);

    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalledTimes(3);
    });

    // All ids are now found and observed; the MutationObserver should stop watching.
    await waitFor(() => {
      expect(disconnectSpy).toHaveBeenCalled();
    });

    disconnectSpy.mockRestore();
  });
});
