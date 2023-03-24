import { IconDeviceTv, IconHeart, IconHome2, IconMovie, IconSearch } from "@tabler/icons-react";

export const SIDE_NAV = [
  {
    name: "Home",
    icon: IconHome2,
    href: "/",
  },
  {
    name: "Movies",
    icon: IconMovie,
    href: "/movies",
  },
  {
    name: "TV Shows",
    icon: IconDeviceTv,
    href: "/tv",
  },
  {
    name: "Watchlist",
    icon: IconHeart,
    href: "/watchlist",
  },
  {
    name: "Search",
    icon: IconSearch,
    href: "/search",
  },
];

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const IMDB_LINK_BASE_URL = "https://www.imdb.com/title";

export const POSTER_IMAGE = {
  W92: `${TMDB_IMAGE_BASE_URL}/w92`,
  W154: `${TMDB_IMAGE_BASE_URL}/w154`,
  W184: `${TMDB_IMAGE_BASE_URL}/w184`,
  W342: `${TMDB_IMAGE_BASE_URL}/w342`,
  W500: `${TMDB_IMAGE_BASE_URL}/w500`,
  W780: `${TMDB_IMAGE_BASE_URL}/w780`,
  ORIGINAL: `${TMDB_IMAGE_BASE_URL}/original`,
};

export const BACKDROP_IMAGE = {
  W300: `${TMDB_IMAGE_BASE_URL}/w300`,
  W780: `${TMDB_IMAGE_BASE_URL}/w780`,
  W1280: `${TMDB_IMAGE_BASE_URL}/w1280`,
  ORIGINAL: `${TMDB_IMAGE_BASE_URL}/original`,
};

export const PROFILE_IMAGE = {
  W45: `${TMDB_IMAGE_BASE_URL}/w45`,
  W185: `${TMDB_IMAGE_BASE_URL}/w185`,
  H632: `${TMDB_IMAGE_BASE_URL}/h632`,
  ORIGINAL: `${TMDB_IMAGE_BASE_URL}/original`,
};
