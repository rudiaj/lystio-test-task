export interface TenementFilters {
  withinId: string[];
  type: string[];
  rentType: string[];
  rent: [number, number];
}

export interface TenementCountResponse {
  count: number;
}

export const getTenementCount = async (
  filters: TenementFilters,
): Promise<TenementCountResponse> => {
  try {
    const response = await fetch(
      "https://api.lystio.co/tenement/search/count",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: {
          revalidate: 300,
        },
        body: JSON.stringify(filters),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tenement count:", error);
    throw error;
  }
};
