import { DEFAULT_ID } from "@/constants/defaultFilterValues";
import { useSearchParams } from "next/navigation";

export type Location = {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
    postal_code: string;
  }[];
};

export const useActiveLocation = (locations: Location[]) => {
  const searchParams = useSearchParams();

  const getDefaultActiveIndex = () => {
    const withinId = searchParams.get("withinId");

    if (withinId) {
      const index = locations.findIndex((location) => location.id === withinId);
      return index !== -1 ? index : 0;
    }

    const defaultIndex = locations.findIndex(
      (location) => location.id === DEFAULT_ID,
    );
    return defaultIndex !== -1 ? defaultIndex : 0;
  };

  return {
    activeLocationIndex: getDefaultActiveIndex(),
  };
};
