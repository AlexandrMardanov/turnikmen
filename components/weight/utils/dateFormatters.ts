/**
 * Formats a date string to DD/MM format with leading zeros
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "01/03", "21/12")
 */
export function formatDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return `${day}/${month}`;
}

/**
 * Formats a date string to DD.MM.YYYY format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "01.03.2024", "21.12.2024")
 */
export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
