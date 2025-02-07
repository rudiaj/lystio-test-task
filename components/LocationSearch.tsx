"use client";

import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Popover } from "radix-ui";
import { useDebouncedCallback } from "use-debounce";
import LocationList, { LocationItem } from "./LocationList";
import PopularLocations from "./PopularLocations";
import { Location, useActiveLocation } from "@/hooks/useActiveLocation";
import { useRouter, useSearchParams } from "next/navigation";

const sessionToken = uuidv4();

interface LocationSearchProps {
  recentSearches: LocationItem[];
  popularLocations: Location[];
}

export const LocationSearch = ({
  recentSearches,
  popularLocations,
}: LocationSearchProps) => {
  const { activeLocationIndex } = useActiveLocation(popularLocations);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(activeLocationIndex);

  const debouncedFetch = useDebouncedCallback(async (value: string) => {
    if (!value) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
          value,
        )}
          &language=de
          &country=at
          &types=address,district,place,locality,neighborhood,city,street,poi
          &session_token=${sessionToken}
          &access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`.replace(
          /\s/g,
          "",
        ),
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 300);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.push(`?${params.toString()}`, { scroll: false });
    debouncedFetch(value);
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="relative md:pr-4 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-[46px] md:after:w-[1px] md:after:-translate-y-1/2 md:after:bg-[#C6C6C6]">
        <div className="flex items-center gap-[26px]">
          <Image width={22} height={22} alt="icon" src="/search.svg" />
          <div className="flex flex-1 flex-col items-start justify-center">
            <span className="text-lg">Location</span>
            <input
              className="w-full truncate text-base text-black outline-none"
              placeholder="Search address, neighbourhood, city, or ZIP code"
              value={searchValue}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          alignOffset={0}
          sideOffset={32}
          className="grid h-[618px] w-[calc(100vw-48px)] grid-cols-2 overflow-hidden rounded-xl bg-white py-8 shadow-popover data-[state=closed]:animate-[popup-content-hide_200ms] data-[state=open]:animate-[popup-content-show_200ms] md:w-max"
          align="center"
        >
          <div className="flex h-full flex-col gap-2 overflow-auto">
            <PopularLocations
              activeIndex={activeIndex}
              title="Popular Locations"
              items={popularLocations}
              onChange={setActiveIndex}
            />
            <LocationList
              title="Recent Searches"
              items={recentSearches}
              onSelect={handleInputChange}
            />
          </div>
          <div className="h-full overflow-auto">
            <LocationList
              title={`Districts in ${popularLocations[activeIndex].name}`}
              items={popularLocations[activeIndex].children || []}
              onSelect={handleInputChange}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
