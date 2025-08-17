import { render, mockProject } from '../../../shared/test-utils/test-utils';
import { axe } from 'jest-axe';
import Header from '../Header';
import ProjectModal from '../sections/project/ProjectModal';

describe('Accessibility Tests', () => {
  describe('Header Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic structure and focus management', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'heading-order': { enabled: true },
          'focus-order-semantics': { enabled: true },
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
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

    it('should have proper modal semantics and focus management', async () => {
      const { container } = render(
        <ProjectModal project={mockProject} onClose={jest.fn()} />
      );
      const results = await axe(container, {
        rules: {
          'focus-order-semantics': { enabled: true },
          'image-alt': { enabled: true },
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('General Accessibility Rules', () => {
    it('should have proper ARIA labels and semantic structure', async () => {
      const { container } = render(<Header />);
      const results = await axe(container, {
        rules: {
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
          'landmark-one-main': { enabled: true },
          'page-has-heading-one': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
