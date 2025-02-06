import { Plus_Jakarta_Sans, ABeeZee, Abel } from "next/font/google";

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const aBeeZee = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  style: ["italic"],
  variable: "--font-ABeeZee",
});

export const abel = Abel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-Abel",
});
