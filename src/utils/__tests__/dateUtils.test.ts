import { describe, expect, test } from '@jest/globals';
import { calculateDuration } from '../dateUtils';

describe('calculateDuration', () => {
  describe('Basic duration calculations', () => {
    test('should calculate correct duration for Jan 2022 — Jun 2023', () => {
      const result = calculateDuration('Jan 2022 — Jun 2023');
      expect(result).toBe('1 yr 6 mos');
    });

    test('should calculate correct duration for Feb 2024 — Dec 2024', () => {
      const result = calculateDuration('Feb 2024 — Dec 2024');
      expect(result).toBe('11 mos');
    });

    test('should calculate correct duration for Jan 2023 — Dec 2023', () => {
      const result = calculateDuration('Jan 2023 — Dec 2023');
      expect(result).toBe('1 yr');
    });

    test('should calculate correct duration for Jan 2022 — Jan 2023', () => {
      const result = calculateDuration('Jan 2022 — Jan 2023');
      expect(result).toBe('1 yr 1 mo');
    });

    test('should calculate correct duration for Jun 2022 — Jun 2023', () => {
      const result = calculateDuration('Jun 2022 — Jun 2023');
      expect(result).toBe('1 yr 1 mo');
    });

    test('should calculate correct duration for Jan 2023 — Feb 2023', () => {
      const result = calculateDuration('Jan 2023 — Feb 2023');
      expect(result).toBe('2 mos');
    });
  });

  describe('Edge cases', () => {
    test('should handle same month and year', () => {
      const result = calculateDuration('Jan 2023 — Jan 2023');
      expect(result).toBe('1 mo');
    });

    test('should handle consecutive months in same year', () => {
      const result = calculateDuration('Mar 2023 — Apr 2023');
      expect(result).toBe('2 mos');
    });

    test('should handle multiple years', () => {
      const result = calculateDuration('Jan 2020 — Jan 2023');
      expect(result).toBe('3 yrs 1 mo');
    });

    test('should handle exact year difference', () => {
      const result = calculateDuration('Jan 2022 — Jan 2023');
      expect(result).toBe('1 yr 1 mo');
    });

    test('should handle year boundary crossing', () => {
      const result = calculateDuration('Dec 2022 — Jan 2023');
      expect(result).toBe('2 mos');
    });
  });

  describe('Present date handling', () => {
    test('should handle Present as end date', () => {
      const result = calculateDuration('Jul 2023 — Present');
      // This will vary based on current date, so we'll just check it's not an error
      expect(result).not.toBe('Invalid start date');
      expect(result).not.toBe('Invalid end date');
      expect(result).toMatch(/^\d+ (yr|yrs)( \d+ (mo|mos))?$/);
    });

    test('should handle Present with different start dates', () => {
      const result = calculateDuration('Jan 2024 — Present');
      expect(result).not.toBe('Invalid start date');
      expect(result).not.toBe('Invalid end date');
      // This will vary based on current date, so we'll just check it's a valid format
      expect(result).toMatch(/^\d+ (yr|yrs)( \d+ (mo|mos))?$|^\d+ (mo|mos)$/);
    });
  });

  describe('Error handling', () => {
    test('should handle invalid start date format', () => {
      const result = calculateDuration('Invalid Date — Jun 2023');
      expect(result).toBe('Invalid start date');
    });

    test('should handle invalid end date format', () => {
      const result = calculateDuration('Jan 2023 — Invalid Date');
      expect(result).toBe('Invalid end date');
    });

    test('should handle malformed period string', () => {
      const result = calculateDuration('Jan 2023');
      expect(result).toBe('Invalid end date');
    });

    test('should handle empty string', () => {
      const result = calculateDuration('');
      expect(result).toBe('Invalid start date');
    });
  });

  describe('Month abbreviations', () => {
    test('should handle all month abbreviations', () => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      months.forEach((endMonth, index) => {
        const startMonth = 'Jan';
        const result = calculateDuration(
          `${startMonth} 2023 — ${endMonth} 2023`
        );

        if (index === 0) {
          expect(result).toBe('1 mo'); // Jan to Jan
        } else if (index === 11) {
          expect(result).toBe('1 yr'); // Jan to Dec
        } else {
          expect(result).toBe(`${index + 1} mos`); // Jan to other months
        }
      });
    });
  });

  describe('Case sensitivity', () => {
    test('should handle lowercase month names', () => {
      const result = calculateDuration('jan 2022 — jun 2023');
      expect(result).toBe('1 yr 6 mos');
    });

    test('should handle mixed case month names', () => {
      const result = calculateDuration('JAN 2022 — JUN 2023');
      expect(result).toBe('1 yr 6 mos');
    });

    test('should handle lowercase present', () => {
      const result = calculateDuration('Jan 2023 — present');
      expect(result).not.toBe('Invalid end date');
    });
  });
});
