import { getDetails, getSimilar } from "~/lib/api";
import { TvShowView } from "~/views/TvShow.view";

export default async function TvShowPage({ params }: { params: { id: string } }) {
  const [details, similar] = await Promise.all([
    getDetails("tv", params.id),
    getSimilar("tv", params.id),
  ]);

  return <TvShowView details={details} similar={similar} />;
}
