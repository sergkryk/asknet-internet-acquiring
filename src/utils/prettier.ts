export function phoneNumberFormatter(number: string) {
    const cleaned = number.replace(/\D/g, ''); // Remove non-numeric characters
    const match = cleaned.match(/^(7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/); // Pattern for phone number
    if (match) {
      return `+7${match[2]}${match[3]}${match[4]}${match[5]}`;
    }
    return number; // Return the original if it doesn't match the pattern
  }