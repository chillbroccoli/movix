import { TrendingResource } from "../types";

export const getRandomResource = (list: TrendingResource[]) => {
  const shuffled = list.sort(() => 0.5 - Math.random());
  const randomIndex = Math.floor(Math.random() * shuffled.length);
  return shuffled[randomIndex];
};
