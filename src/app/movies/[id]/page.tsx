import { Featured } from "~/components/Featured";
import { MovieDetails } from "~/components/MovieDetails";
import { getDetails, getSimilar } from "~/lib/api";

export default async function MoviePage({ params }: { params: { id: string } }) {
  const [details, similar] = await Promise.all([
    getDetails("movie", params.id),
    getSimilar("movie", params.id),
  ]);

  return (
    <div className="w-full">
      <Featured item={details} />
      <MovieDetails item={details} similar={similar.results} />
    </div>
  );
}
