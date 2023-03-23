export function getRandomResource<T>(list: T[]) {
  const shuffled = list.sort(() => 0.5 - Math.random());
  const randomIndex = Math.floor(Math.random() * shuffled.length);
  return shuffled[randomIndex];
}
