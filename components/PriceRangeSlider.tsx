"use client";

import { useCount } from "@/context/CountContext";
import { getTenementCount } from "@/helpers/getTenementCount";
import { useTenementFilters } from "@/hooks/useTenementFilters";
import { useSearchParams } from "next/navigation";
import { Slider } from "radix-ui";
import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

interface PriceRangeSliderProps {
  maxValue?: number;
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
}

interface HistogramResponse {
  range: [number, number];
  histogram: number[];
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  range,
  setRange,
}) => {
  const searchParams = useSearchParams();
  const { setCount } = useCount();
  const { getFilters, filters } = useTenementFilters();
  const [histogramData, setHistogramData] = useState<HistogramResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const normalizedHeights = useMemo(() => {
    if (!histogramData?.histogram || !Array.isArray(histogramData.histogram))
      return Array(20).fill(0);
    const maxCount = Math.max(...histogramData.histogram);
    return histogramData.histogram.map((count) =>
      maxCount > 0 ? (count / maxCount) * 110 : 0,
    );
  }, [histogramData]);

  const bucketWidth = useMemo(() => {
    if (!histogramData?.range) return 0;
    const [min, max] = histogramData.range;
    return (max - min) / 20;
  }, [histogramData]);

  useEffect(() => {
    const fetchHistogram = async () => {
      setError(null);
      try {
        const response = await fetch(
          "https://api.lystio.co/tenement/search/histogram",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (
          !data?.histogram ||
          !Array.isArray(data.histogram) ||
          !data?.range
        ) {
          throw new Error("Invalid histogram data structure");
        }

        setHistogramData(data);
      } catch (error) {
        console.error("Error fetching histogram:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch histogram data",
        );
        setHistogramData({
          range: [0, 5000],
          histogram: Array(20).fill(0),
        });
      }
    };

    fetchHistogram();
  }, [filters]);

  const debouncedGetCount = useDebouncedCallback(async (newRange: number[]) => {
    try {
      const filters = getFilters({ rent: newRange as [number, number] });
      const { count } = await getTenementCount(filters);
      setCount(count);
    } catch (error) {
      console.error("Error getting count:", error);
    }
  }, 300);

  const handleInputChange = (index: number, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numValue = Number(value);
    const newRange = [...range];
    newRange[index] = numValue;

    if (index === 0 && numValue > range[1]) {
      newRange[0] = range[1];
    } else if (index === 1 && numValue < range[0]) {
      newRange[1] = range[0];
    }

    params.set(index === 0 ? "minRent" : "maxRent", String(newRange[index]));
    window.history.replaceState(null, "", `?${params.toString()}`);
    setRange(newRange);
    debouncedGetCount(newRange);
  };

  const handleSliderChange = (newRange: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minRent", String(newRange[0]));
    params.set("maxRent", String(newRange[1]));
    window.history.replaceState(null, "", `?${params.toString()}`);

    debouncedGetCount(newRange);
    setRange(newRange);
  };

  const currentHistogramData = histogramData || {
    range: [0, 5000],
    histogram: Array(20).fill(0),
  };

  return (
    <div className="mx-auto w-full">
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      <div className="relative mb-4">
        <div className="bottom-6 flex h-[163px] w-full items-end">
          {normalizedHeights.map((height, index) => (
            <div
              key={index}
              className="mx-[2px] flex-1"
              style={{
                height: `${height}px`,
                background:
                  range[0] <=
                    currentHistogramData.range[0] + index * bucketWidth &&
                  currentHistogramData.range[0] + index * bucketWidth <=
                    range[1]
                    ? "#a540f3"
                    : "#EEE7FF",
              }}
            />
          ))}
        </div>

        <Slider.Root
          className="relative flex h-5 w-full -translate-y-[6px] touch-none select-none items-center"
          value={range}
          onValueChange={handleSliderChange}
          min={currentHistogramData.range[0]}
          max={currentHistogramData.range[1]}
          step={
            (currentHistogramData.range[1] - currentHistogramData.range[0]) / 20
          }
          minStepsBetweenThumbs={1}
        >
          <Slider.Track className="relative h-2 grow rounded-sm bg-[#D1BFF8] bg-opacity-[37%]">
            <Slider.Range className="absolute h-full rounded-full bg-primary" />
          </Slider.Track>
          <Slider.Thumb
            className="focus:shadow-outline block h-[45px] w-[45px] rounded-full border border-[#EEE7FF] bg-white shadow-popover hover:bg-[##EEE7FF] focus:outline-none"
            aria-label="Minimum price"
          />
          <Slider.Thumb
            className="focus:shadow-outline block h-[45px] w-[45px] rounded-full border border-[#EEE7FF] bg-white shadow-popover hover:bg-[##EEE7FF] focus:outline-none"
            aria-label="Maximum price"
          />
        </Slider.Root>
      </div>

      <div className="md flex flex-col justify-between text-sm sm:flex-row">
        <div className="flex flex-col gap-2">
          <span className="text-base text-black/80">Min</span>
          <div className="relative">
            <input
              type="number"
              value={range[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="w-full rounded-md border border-[#E0DEF7] px-[10px] py-[13px] pr-8 text-base text-black sm:w-[200px]"
              min={currentHistogramData.range[0]}
              max={currentHistogramData.range[1]}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              €
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base text-black/80">Max</span>
          <div className="relative">
            <input
              type="number"
              value={range[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="w-full rounded-md border border-[#E0DEF7] px-[10px] py-[13px] pr-8 text-base text-black sm:w-[200px]"
              min={currentHistogramData.range[0]}
              max={currentHistogramData.range[1]}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
