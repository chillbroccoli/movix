import { getDetails, getSimilar } from "~/lib/api";
import { MovieView } from "~/views/Movie.view";

export default async function MoviePage({ params }: { params: { id: string } }) {
  const [details, similar] = await Promise.all([
    getDetails("movie", params.id),
    getSimilar("movie", params.id),
  ]);

  return <MovieView details={details} similar={similar} />;
}
