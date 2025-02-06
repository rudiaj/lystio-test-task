import Image from "next/image";
import React from "react";

export const Navigation = () => {
  return (
    <nav className="mx-auto flex h-[90px] w-full max-w-[2425px] items-center justify-between bg-white px-4">
      <Image src="logo.svg" alt="lystio logo" width={112} height={53} />
      <ul className="hidden gap-2 md:flex md:gap-10">
        <li className="whitespace-nowrap">Rent/Buy</li>
        <li className="whitespace-nowrap">Owners</li>
        <li className="whitespace-nowrap">For Brokers</li>
        <li className="whitespace-nowrap">About Us</li>
      </ul>
      <div className="hidden gap-3 md:flex">
        <button className="flex h-[62px] items-center justify-center rounded-full border border-[#4F4040] bg-transparent px-[60px] text-[15px] leading-6 text-black">
          Log-In
        </button>
        <button className="flex h-[62px] items-center justify-center rounded-full bg-primary px-[60px] text-[15px] leading-6 text-white">
          Register
        </button>
      </div>
    </nav>
  );
};
