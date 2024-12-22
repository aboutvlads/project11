const TIME_UNITS = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2628000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 }
] as const;

export function formatRelativeTime(date: string | Date): string {
  const timestamp = new Date(date).getTime();
  const now = Date.now();
  const diff = now - timestamp;

  // If less than 1 minute, return "just now"
  if (diff < 60000) {
    return 'just now';
  }

  // Find the appropriate time unit
  const unit = TIME_UNITS.find(unit => diff >= unit.ms) || TIME_UNITS[TIME_UNITS.length - 1];
  const value = Math.floor(diff / unit.ms);

  return `${value} ${unit.unit}${value !== 1 ? 's' : ''} ago`;
}