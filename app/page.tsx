import { Hero } from "@/components/Hero";
import { DEFAULT_ID, DEFAULT_MAX } from "@/constants/defaultFilterValues";
import { TYPES } from "@/constants/types";
import { CountProvider } from "@/context/CountContext";
import { getTenementCount, TenementFilters } from "@/helpers/getTenementCount";
import { normalizeRentType } from "@/helpers/normalizeRentType";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const typeParam = resolvedSearchParams.type;
  const selectedCategories = typeParam
    ? Array.isArray(typeParam)
      ? typeParam
      : [typeParam]
    : TYPES.map((category) => category.id.toString());

  const withinIdParam = resolvedSearchParams.withinId;
  const selectedWithinId = withinIdParam
    ? Array.isArray(withinIdParam)
      ? withinIdParam
      : [withinIdParam]
    : [DEFAULT_ID];

  const rentTypeParam = resolvedSearchParams.rentType;
  const selectedRentType = [normalizeRentType(rentTypeParam)];

  const minRentParam = resolvedSearchParams.minRent;
  const maxRentParam = resolvedSearchParams.maxRent;

  const rentRange: [number, number] = [
    Number(minRentParam) || 0,
    Number(maxRentParam) || DEFAULT_MAX,
  ];

  const defaultFilters: TenementFilters = {
    withinId: selectedWithinId,
    type: selectedCategories,
    rentType: selectedRentType,
    rent: rentRange,
  };

  const { count: initialCount } = await getTenementCount(defaultFilters);

  return (
    <CountProvider initialCount={initialCount}>
      <Hero />
    </CountProvider>
  );
}
