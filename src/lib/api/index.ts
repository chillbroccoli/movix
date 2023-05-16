import { HrefType } from "../types";

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = process.env.API_KEY;

export async function getResource(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  if (!!data.success) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export const getDetails = async (type: HrefType, id: string) =>
  await getResource(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);

export const getTrending = async (type: HrefType) =>
  await getResource(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`);

export const getTopRated = async (type: HrefType) =>
  await getResource(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`);

export const getPopular = async (type: HrefType) =>
  await getResource(`${BASE_URL}/${type}/popular?api_key=${API_KEY}`);

export const getMoviesNowPlaying = async () =>
  await getResource(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);

export const getLatest = async (type: HrefType) =>
  await getResource(`${BASE_URL}/${type}/latest?api_key=${API_KEY}`);

export const getAiringToday = async () =>
  await getResource(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);

export const getSimilar = async (type: HrefType, id: string) =>
  await getResource(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`);

export async function multiSearch(query?: string) {
  if (!query) {
    return null;
  }

  return await getResource(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
}

export const getGenres = async (type: HrefType) =>
  await getResource(
    `${BASE_URL}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );

export const getByGenre = async (type: HrefType, genreId: string, page = 1) =>
  await getResource(
    `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
