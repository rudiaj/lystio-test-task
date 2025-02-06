import Image from "next/image";
import { LocationItem } from "./LocationList";

type SearchItemProps = {
  item: LocationItem;
  onSelect: (item: LocationItem) => void;
};

export const SearchItem = ({ item, onSelect }: SearchItemProps) => (
  <button
    onClick={() => onSelect(item)}
    className="flex w-full items-center px-4 text-left transition-colors duration-200 hover:bg-[#F7F7FD]"
  >
    <div className="mr-[15px] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#F7F7FD]">
      <Image src="/typcn_location.svg" alt="pin" width={24} height={24} />
    </div>
    <div className="flex flex-col">
      <span className="text-base">{item.name}</span>
      {item.postal_code && (
        <span className="text-sm text-black text-opacity-60">
          {item.postal_code}
        </span>
      )}
    </div>
  </button>
);
