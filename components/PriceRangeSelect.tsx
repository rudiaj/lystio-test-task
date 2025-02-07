"use client";

import Image from "next/image";
import { Popover } from "radix-ui";
import PriceRangeSlider from "./PriceRangeSlider";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEFAULT_MAX } from "@/constants/defaultFilterValues";

export const PriceRangeSelect = () => {
  const searchParams = useSearchParams();
  const [range, setRange] = useState<number[]>([
    Number(searchParams.get("minRent")) || 0,
    Number(searchParams.get("maxRent")) || DEFAULT_MAX,
  ]);

  const hasMinAndMax =
    searchParams.has("minRent") || searchParams.has("maxRent");

  return (
    <Popover.Root>
      <Popover.Trigger className="flex w-full min-w-0 gap-[14px]">
        <Image width={29} height={28} alt="icon" src="/price.svg" />
        <div className="flex flex-1 flex-col items-start justify-center truncate">
          <span className="text-lg">Price</span>
          {hasMinAndMax ? (
            <span className="w-full truncate text-left text-base text-black">{`${range[0]}€ - ${range[1]}€`}</span>
          ) : (
            <span className="w-full truncate text-left text-base text-gray">
              Select Price Range
            </span>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          alignOffset={0}
          sideOffset={32}
          className="flex w-[calc(100vw-48px)] flex-col rounded-xl bg-white px-4 py-8 shadow-popover data-[state=closed]:animate-[popup-content-hide_200ms] data-[state=open]:animate-[popup-content-show_200ms] md:w-[619px]"
          align="center"
        >
          <span className="text-lg">Price Range</span>
          <PriceRangeSlider range={range} setRange={setRange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
