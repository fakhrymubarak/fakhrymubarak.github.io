import { render } from '@utils/test-utils';
import { axe } from 'jest-axe';
import Header from '../Header';
import { mockProject } from '@utils/test-utils';
import ProjectModal from '../sections/project/ProjectModal';

describe('Accessibility Tests', () => {
  describe('Header Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading structure', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'heading-order': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper color contrast', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper focus indicators', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'focus-order-semantics': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('ProjectModal Component', () => {
    it('should not have accessibility violations when open', async () => {
      const { container } = render(
        <ProjectModal project={mockProject} onClose={jest.fn()} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper modal semantics', async () => {
      const { container } = render(
        <ProjectModal project={mockProject} onClose={jest.fn()} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper focus management', async () => {
      const { container } = render(
        <ProjectModal project={mockProject} onClose={jest.fn()} />
      );
      const results = await axe(container, {
        rules: {
          'focus-order-semantics': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper image alt text', async () => {
      const { container } = render(
        <ProjectModal project={mockProject} onClose={jest.fn()} />
      );
      const results = await axe(container, {
        rules: {
          'image-alt': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('General Accessibility Rules', () => {
    it('should have proper ARIA labels', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic HTML', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'landmark-one-main': { enabled: true },
          'landmark-unique': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper keyboard navigation', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          tabindex: { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
