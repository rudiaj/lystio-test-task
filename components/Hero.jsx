import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { Suspense } from "react";
import SearchBarSkeleton from "./SearchBarSkeleton";

import { SearchCount } from "./SearchCount";
import { TypeToggle } from "./TypeToggle";

export const Hero = () => {
  return (
    <section className="relative mb-[1000px] flex h-screen max-h-[954px] flex-col items-center justify-center px-4 before:absolute before:inset-0 before:-z-10 before:[background:linear-gradient(90.05deg,rgba(0,0,0,0.4)_9.33%,rgba(102,102,102,0)_49.35%)]">
      <Image
        src="/hero.jpg"
        fill
        priority
        className="-z-20 object-cover object-center"
        alt="hero image"
      />
      <div className="flex w-full max-w-[1624px] flex-col">
        <h1 className="mb-[55px] text-[40px] leading-none text-white md:mb-[111px] md:text-[90px]">
          Rent faster, Buy smarter
        </h1>
        <TypeToggle />
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBar />
        </Suspense>
      </div>
      <SearchCount />
    </section>
  );
};
