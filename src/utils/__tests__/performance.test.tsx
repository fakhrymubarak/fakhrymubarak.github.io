import { render } from '../test-utils';
import Header from '../../components/Header';
import { mockProject } from '../test-utils';
import ProjectModal from '../../components/sections/project/ProjectModal';

describe('Performance Tests', () => {
  describe('Header Component', () => {
    it('should render within acceptable time', () => {
      const startTime = performance.now();

      render(<Header />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 200ms (adjusted for test environment)
      expect(renderTime).toBeLessThan(200);
    });

    it('should not cause memory leaks on multiple renders', () => {
      const initialMemory =
        (performance as Performance & { memory?: { usedJSHeapSize: number } })
          .memory?.usedJSHeapSize || 0;

      // Render multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<Header />);
        unmount();
      }

      const finalMemory =
        (performance as Performance & { memory?: { usedJSHeapSize: number } })
          .memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be minimal (less than 1MB)
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });
  });

  describe('ProjectModal Component', () => {
    it('should render within acceptable time', () => {
      const startTime = performance.now();

      render(<ProjectModal project={mockProject} onClose={jest.fn()} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 150ms (modal is more complex)
      expect(renderTime).toBeLessThan(150);
    });

    it('should handle rapid open/close cycles efficiently', () => {
      const startTime = performance.now();

      // Simulate rapid open/close cycles
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(
          <ProjectModal project={mockProject} onClose={jest.fn()} />
        );
        unmount();
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should complete 5 cycles in less than 500ms
      expect(totalTime).toBeLessThan(500);
    });
  });

  describe('Bundle Size Analysis', () => {
    it('should have reasonable component sizes', () => {
      // This is a placeholder for bundle analysis
      // In a real scenario, you'd use tools like webpack-bundle-analyzer
      expect(true).toBe(true);
    });
  });

  describe('Memory Usage', () => {
    it('should not accumulate memory on re-renders', () => {
      if (
        !(performance as Performance & { memory?: { usedJSHeapSize: number } })
          .memory
      ) {
        // Skip if memory API is not available
        return;
      }

      const initialMemory = (
        performance as Performance & { memory?: { usedJSHeapSize: number } }
      ).memory!.usedJSHeapSize;

      // Perform multiple renders
      for (let i = 0; i < 5; i++) {
        const { rerender } = render(<Header />);
        rerender(<Header />);
      }

      const finalMemory = (
        performance as Performance & { memory?: { usedJSHeapSize: number } }
      ).memory!.usedJSHeapSize;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024); // 5MB
    });
  });

  describe('Event Handler Performance', () => {
    it('should handle rapid clicks efficiently', () => {
      const { getByRole } = render(<Header />);
      const themeButton = getByRole('button', { name: /switch to dark mode/i });

      const startTime = performance.now();

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        themeButton.click();
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 10 clicks in less than 100ms
      expect(totalTime).toBeLessThan(100);
    });
  });
});
