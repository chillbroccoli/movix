export type Trending = {
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

export type TvShow = {
  id: number;
  poster_path?: string;
  popularity: number;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
};

export type Resource = {
  id: number;
  poster_path?: string;
  popularity?: number;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids?: number[];
  name?: string;
  original_name?: string;
  original_title?: string;
  original_language?: string;
  title?: string;
  media_type?: "movie" | "tv";
  video?: boolean;
  origin_country?: string[];
};

export type MovieDetails = {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage?: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  tagline: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  production_companies: { id: number; name: string; logo_path?: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
};
