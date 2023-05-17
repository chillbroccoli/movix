import { Featured } from "~/components/Featured";
import { TvShowDetails } from "~/components/TvShowDetails";
import { ListResponse, Resource, type TvShowDetails as Details } from "~/lib/types";

type TvShowViewProps = {
  details: Details;
  similar: ListResponse<Resource>;
};

export function TvShowView({ details, similar }: TvShowViewProps) {
  return (
    <div className="w-full">
      <Featured item={details} />
      <TvShowDetails item={details} similar={similar.results} />
    </div>
  );
}
