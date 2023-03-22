export type TrendingResource = {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  title?: string;
  name?: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  release_date?: string;
  first_air_date?: string;
};

export type Movie = {
  id: number;
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video?: boolean;
  vote_average: number;
};
