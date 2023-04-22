const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = process.env.API_KEY;

export async function getDetails(type: "movie" | "tv", id: string) {
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getTrending(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getTopRated(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getPopular(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getMoviesNowPlaying() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getLatest(type: "movie" | "tv") {
  const res = await fetch(`${BASE_URL}/${type}/latest?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getAiringToday() {
  const res = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getSimilar(type: "movie" | "tv", id: string) {
  const res = await fetch(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function multiSearch(query?: string) {
  if (!query) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getGenres(type: "movie" | "tv") {
  const res = await fetch(
    `${BASE_URL}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}

export async function getByGenre(type: "movie" | "tv", genreId: string, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data?.status_message ?? "Something went wrong");
  }

  return data;
}
