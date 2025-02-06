"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CountContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountContext = createContext<CountContextType | undefined>(undefined);

interface CountProviderProps {
  children: ReactNode;
  initialCount: number;
}

export function CountProvider({ children, initialCount }: CountProviderProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

export function useCount(): CountContextType {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
