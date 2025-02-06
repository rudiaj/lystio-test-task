"use client";

import { DEFAULT_RENT_TYPE } from "@/constants/defaultFilterValues";
import { useCount } from "@/context/CountContext";
import { getTenementCount } from "@/helpers/getTenementCount";
import { RentType, useTenementFilters } from "@/hooks/useTenementFilters";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup } from "radix-ui";
import { useState } from "react";

export const TypeToggle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get("rentType") || DEFAULT_RENT_TYPE,
  );
  const { setCount } = useCount();
  const { getFilters } = useTenementFilters();

  const getCount = async (newValue: RentType) => {
    const filters = getFilters({ rentType: newValue });

    const { count } = await getTenementCount(filters);
    setCount(count);
  };

  const onValueChange = (newValue: RentType) => {
    if (newValue) {
      setValue(newValue);
      const params = new URLSearchParams(searchParams.toString());
      params.set("rentType", newValue);
      router.push(`?${params.toString()}`, { scroll: false });
    }

    if (["rent", "buy"].includes(newValue)) {
      getCount(newValue);
    }
  };

  return (
    <ToggleGroup.Root
      value={value}
      type="single"
      aria-label="Text alignment"
      className="mb-5 grid w-full grid-cols-3 overflow-hidden rounded-[30px] border border-primary bg-white md:m-6 md:w-max"
      onValueChange={onValueChange}
    >
      <ToggleGroup.Item
        value="rent"
        aria-label="Left aligned"
        className="flex items-center justify-center whitespace-nowrap rounded-[30px] bg-white px-6 py-3 text-sm transition-colors duration-200 ease-out first:ml-0 data-[state=on]:bg-primary data-[state=on]:text-white md:px-[52px] md:py-[18px] md:text-base"
      >
        Rent
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="buy"
        aria-label="Center aligned"
        className="flex items-center justify-center whitespace-nowrap rounded-[30px] bg-white px-6 py-3 text-sm transition-colors duration-200 ease-out first:ml-0 data-[state=on]:bg-primary data-[state=on]:text-white md:px-[52px] md:py-[18px] md:text-base"
      >
        Buy
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="ai"
        aria-label="Right aligned"
        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] bg-white px-6 py-3 text-sm transition-colors duration-200 ease-out first:ml-0 data-[state=on]:bg-primary data-[state=on]:text-white md:px-[52px] md:py-[18px] md:text-base"
      >
        <Image
          height={22}
          width={22}
          alt="ai icon"
          src="/mingcute_ai-fill.png"
        />
        Lystio A.I
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
