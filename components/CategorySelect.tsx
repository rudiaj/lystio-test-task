"use client";

import { TYPES } from "@/constants/types";
import clsx from "clsx";
import Image from "next/image";
import { Select } from "radix-ui";
import { useSearchParams } from "next/navigation";
import { getTenementCount } from "@/helpers/getTenementCount";
import { useCount } from "@/context/CountContext";
import { useTenementFilters } from "@/hooks/useTenementFilters";

interface CategorySelectProps {
  onValueChange?: (value: string) => void;
}

export const CategorySelect = ({ onValueChange }: CategorySelectProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("type");
  const { setCount } = useCount();
  const { getFilters } = useTenementFilters();

  const updateQueryParam = async (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", newValue);
    window.history.replaceState(null, "", `?${params.toString()}`);
    onValueChange?.(newValue);

    const filters = getFilters({ type: newValue });
    const { count } = await getTenementCount(filters);

    setCount(count);
  };

  return (
    <Select.Root
      value={currentCategory || undefined}
      onValueChange={updateQueryParam}
    >
      <Select.Trigger
        className={clsx(
          "relative flex gap-[14px] overflow-hidden whitespace-nowrap outline-transparent transition-colors duration-200 ease-out md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-[46px] md:after:w-[1px] md:after:-translate-y-1/2 md:after:bg-[#C6C6C6]",
          currentCategory ? "text-black" : "text-gray",
        )}
      >
        <div className="flex flex-1 items-center justify-between gap-[14px] truncate bg-white pr-4 text-base">
          <Image width={24} height={25} alt="icon" src="/category.svg" />
          <div className="flex flex-1 flex-col items-start truncate">
            <span className="text-lg text-black">Category</span>
            <Select.Value placeholder="Select category"></Select.Value>
          </div>
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="w-max overflow-hidden rounded-xl bg-white py-8 shadow-popover data-[state=closed]:animate-[popup-content-hide_200ms] data-[state=open]:animate-[popup-content-show_200ms]"
          position="popper"
          sideOffset={32}
          align="center"
        >
          <Select.Viewport>
            <div className="px-4 py-1">
              <span className="text-lg">All Categories</span>
            </div>
            {TYPES.map((category) => (
              <Select.Item
                key={category.id}
                value={category.id.toString()}
                className="flex cursor-pointer select-none items-center gap-[15px] whitespace-nowrap px-4 py-2 text-base outline-none transition-colors duration-200 ease-out hover:bg-[#F7F7FD]"
              >
                <Image
                  src={category.src}
                  width={32}
                  height={32}
                  alt={`${category.name} icon`}
                />
                <Select.ItemText>{category.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
