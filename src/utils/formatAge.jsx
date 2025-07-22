export function formatAge(age) {
  if (typeof age === 'object') {
    const { years = 0, months = 0 } = age;
    const parts = [];
    if (years > 0) parts.push(`${years} سال`);
    if (months > 0) parts.push(`${months} ماه`);
    return parts.join(' و ') || '---';
  }
  return `${age} سال`;
}
