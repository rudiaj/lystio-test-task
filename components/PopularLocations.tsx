"use client";

import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";

import { useCount } from "@/context/CountContext";
import { getTenementCount } from "@/helpers/getTenementCount";
import { useTenementFilters } from "@/hooks/useTenementFilters";

export type LocationItem = {
  id: string;
  name: string;
};

type LocationListProps = {
  items: LocationItem[];
  title: string;
  emptyMessage?: string;
  activeIndex: number;
  onChange: Dispatch<SetStateAction<number>>;
};

function PopularLocations({
  items,
  title,
  emptyMessage = "No items found",
  onChange,
  activeIndex,
}: LocationListProps) {
  const searchParams = useSearchParams();
  const { setCount } = useCount();

  const { getFilters } = useTenementFilters();

  if (!items.length) {
    return (
      <h3 className="mb-2 px-4 py-1 text-sm text-[#0E0E0E] text-opacity-60">
        {emptyMessage}
      </h3>
    );
  }

  const onClick = async (id: string, index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("withinId", id);

    window.history.replaceState(null, "", `?${params.toString()}`);

    const filters = getFilters({ withinId: id });

    const { count } = await getTenementCount(filters);

    onChange(index);
    setCount(count);
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 px-4 py-1 text-sm text-[#0E0E0E] text-opacity-60">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id, index)}
            type="button"
            className={clsx(
              "flex w-full items-center px-4 transition-colors duration-200 hover:bg-[#F7F7FD]",
              activeIndex === index ? "bg-[#F7F7FD]" : "bg-transparent",
            )}
          >
            <Image
              src={`/${item.name}.jpg`}
              width={47}
              height={47}
              alt={item.name}
              className="mr-4"
            />
            <div className="flex flex-1 justify-between">
              <h3 className="text-base">{item.name}</h3>
              {activeIndex === index && (
                <span>
                  <Image
                    className="text-base"
                    src="/si_chevron-right-fill.svg"
                    height={24}
                    width={24}
                    alt="chevron"
                  />
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopularLocations;
