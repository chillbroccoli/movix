export function convertTime(num: number) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
}
