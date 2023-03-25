export function getAverage(list: number[]) {
  const sum = list.reduce((acc, curr) => acc + curr, 0);
  return sum / list.length;
}
