const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = process.env.API_KEY;

export async function getTrending(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`);
  return res.json();
}

export async function getTopRated(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`);
  return res.json();
}

export async function getPopular(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}`);
  return res.json();
}

export async function getMoviesNowPlaying() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return res.json();
}

export async function getLatest(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/latest?api_key=${API_KEY}`);
  return res.json();
}

export async function getAiringToday() {
  const res = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
  return res.json();
}
