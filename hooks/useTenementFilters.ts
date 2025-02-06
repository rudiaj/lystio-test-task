"use client";

import { useSearchParams } from "next/navigation";
import { TYPES } from "@/constants/types";
import { TenementFilters } from "@/helpers/getTenementCount";
import { DEFAULT_ID, DEFAULT_MAX } from "@/constants/defaultFilterValues";
import { normalizeRentType } from "@/helpers/normalizeRentType";

export type RentType = "rent" | "buy";

type PartialFilters = Partial<{
  withinId: string | string[];
  type: string | string[];
  rentType: RentType;
  rent: [number, number];
}>;
export const useTenementFilters = () => {
  const searchParams = useSearchParams();

  const getFilters = (override?: PartialFilters): TenementFilters => {
    const withinId = searchParams.get("withinId");
    const type = searchParams.get("type");
    const rentType = searchParams.get("rentType") as RentType;
    const minRent = searchParams.get("minRent");
    const maxRent = searchParams.get("maxRent");

    const ensureArray = <T>(value: T | T[] | undefined): T[] => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    };

    const baseFilters: TenementFilters = {
      withinId: withinId ? [withinId] : [DEFAULT_ID],
      type: type ? [type] : TYPES.map((type) => type.id.toString()),
      rentType: [normalizeRentType(rentType)],
      rent: [
        minRent ? Number(minRent) : 0,
        maxRent ? Number(maxRent) : DEFAULT_MAX,
      ],
    };

    if (!override) return baseFilters;

    return {
      ...baseFilters,
      ...(override.withinId && { withinId: ensureArray(override.withinId) }),
      ...(override.type && { type: ensureArray(override.type) }),
      ...(override.rentType && {
        rentType: [normalizeRentType(override.rentType)],
      }),
      ...(override.rent && { rent: override.rent }),
    };
  };

  return {
    filters: getFilters(),
    getFilters,
  };
};
