import { SearchItem } from "./SearchItem";

export type LocationItem = {
  id: string;
  name: string;
  postal_code: string;
};

type LocationListProps = {
  items: LocationItem[];
  title: string;
  emptyMessage?: string;
};

function LocationList({
  items,
  title,
  emptyMessage = "No items found",
}: LocationListProps) {
  if (!items.length) {
    return (
      <h3 className="mb-2 px-4 py-1 text-sm text-[#0E0E0E] text-opacity-60">
        {emptyMessage}
      </h3>
    );
  }

  return (
    <div className="">
      <h3 className="mb-2 px-4 py-1 text-sm text-[#0E0E0E] text-opacity-60">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <SearchItem key={item.id} item={item} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default LocationList;
