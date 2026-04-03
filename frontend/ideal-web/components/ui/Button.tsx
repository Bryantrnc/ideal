import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`transition-all duration-300 hover:scale-[1.01] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}