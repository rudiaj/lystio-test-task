"use client";

import { useCount } from "@/context/CountContext";

export const SearchCount = () => {
  const { count } = useCount();

  return (
    <h1 className="mt-[111px] text-center font-aBeeZee text-[23px] leading-normal text-white">
      <span className="font-abel">{count}</span> verified listings
      <br /> for apartments, houses, office and more
    </h1>
  );
};
