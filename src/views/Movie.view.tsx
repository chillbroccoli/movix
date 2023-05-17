import { Featured } from "~/components/Featured";
import { MovieDetails } from "~/components/MovieDetails";
import { ListResponse, type MovieDetails as Details, Resource } from "~/lib/types";

type MovieViewProps = {
  details: Details;
  similar: ListResponse<Resource>;
};

export function MovieView({ details, similar }: MovieViewProps) {
  return (
    <div className="w-full">
      <Featured item={details} />
      <MovieDetails item={details} similar={similar.results} />
    </div>
  );
}
