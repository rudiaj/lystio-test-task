import { CategorySelect } from "./CategorySelect";
import { LocationSearch } from "./LocationSearch";
import { PriceRangeSelect } from "./PriceRangeSelect";

export const SearchBar = async () => {
  const recentSearchesResponse = await fetch(
    "https://api.lystio.co/geo/search/recent",
    {
      cache: "force-cache",
      next: {
        revalidate: 300,
      },
    },
  );

  const popularLocationsResponse = await fetch(
    "https://api.lystio.co/geo/boundary/popular",
    {
      cache: "force-cache",
      next: {
        revalidate: 300,
      },
    },
  );

  const recentSearches = await recentSearchesResponse.json();
  const popularLocations = await popularLocationsResponse.json();

  return (
    <div className="grid grid-cols-1 gap-4 rounded-[30px] border border-primary bg-white p-5 md:grid-cols-[40%_1fr_1fr_auto] md:rounded-[100px]">
      <LocationSearch
        recentSearches={recentSearches}
        popularLocations={popularLocations}
      />
      <CategorySelect />
      <PriceRangeSelect />
      <button className="flex h-[60px] items-center justify-center rounded-full bg-primary px-10 text-[18px] font-bold leading-6 text-white">
        Search
      </button>
    </div>
  );
};
