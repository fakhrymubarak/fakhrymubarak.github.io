/**
 * Calculate duration between two dates in a human-readable format
 * @param period - String in format "Start Date — End Date" or "Start Date — Present"
 * @returns Formatted duration string (e.g., "2 yrs", "1 yr 6 mos", "11 mos")
 */
export function calculateDuration(period: string): string {
  const [startDateStr, endDateStr] = period.split(' — ').map(s => s.trim());

  // Parse start date
  const startDate = parseDate(startDateStr);
  if (!startDate) {
    return 'Invalid start date';
  }

  // Parse end date (handle "Present" case)
  let endDate: Date | null;
  if (!endDateStr) {
    return 'Invalid end date';
  }

  if (endDateStr.toLowerCase() === 'present') {
    endDate = new Date();
  } else {
    endDate = parseDate(endDateStr);
    if (!endDate) {
      return 'Invalid end date';
    }
  }

  // Calculate difference using proper month calculation
  // For inclusive counting, we need to consider that if we're counting from Jan to Jun,
  // we count: Jan, Feb, Mar, Apr, May, Jun = 6 months
  const diffYears = endDate.getFullYear() - startDate.getFullYear();
  const diffMonths = endDate.getMonth() - startDate.getMonth();

  let totalMonths = diffYears * 12 + diffMonths;

  // Always add 1 for inclusive counting
  // For inclusive counting: Jan to Jan = 1 month, Jan to Feb = 2 months, etc.
  totalMonths += 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Format the result
  if (years > 0) {
    if (months > 0) {
      return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} ${months === 1 ? 'mo' : 'mos'}`;
    } else {
      return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    }
  } else {
    return `${months} ${months === 1 ? 'mo' : 'mos'}`;
  }
}

/**
 * Parse date string in format "MMM YYYY" (e.g., "Jul 2023", "Jan 2022")
 * @param dateStr - Date string to parse
 * @returns Date object or null if invalid
 */
function parseDate(dateStr: string): Date | null {
  const months: { [key: string]: number } = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  const parts = dateStr.toLowerCase().split(' ');
  if (parts.length !== 2) return null;

  const month = months[parts[0]];
  const year = parseInt(parts[1]);

  if (month === undefined || isNaN(year)) return null;

  return new Date(year, month, 1);
}
