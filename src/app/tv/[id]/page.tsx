import { Featured } from "~/components/Featured";
import { TvShowDetails } from "~/components/TvShowDetails";
import { getDetails, getSimilar } from "~/lib/api";

export default async function TvShowPage({ params }: { params: { id: string } }) {
  const [details, similar] = await Promise.all([
    getDetails("tv", params.id),
    getSimilar("tv", params.id),
  ]);

  return (
    <div className="w-full">
      <Featured item={details} />
      <TvShowDetails item={details} similar={similar.results} />
    </div>
  );
}
