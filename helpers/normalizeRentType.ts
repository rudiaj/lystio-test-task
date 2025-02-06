import { DEFAULT_RENT_TYPE } from "@/constants/defaultFilterValues";

export const normalizeRentType = (rentType: string | string[] | undefined) => {
  if (!rentType) return DEFAULT_RENT_TYPE;
  const value = Array.isArray(rentType) ? rentType[0] : rentType;
  return ["rent", "buy"].includes(value) ? value : DEFAULT_RENT_TYPE;
};
