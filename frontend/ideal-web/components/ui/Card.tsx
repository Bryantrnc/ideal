import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-[#090909]/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}