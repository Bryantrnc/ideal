import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = SharedProps & {
  href: string;
};

function getVariantClasses(variant: Variant) {
  switch (variant) {
    case "secondary":
      return "border border-white/10 bg-white/5 text-white hover:bg-white/10";
    case "ghost":
      return "border border-white/10 bg-transparent text-[#D8D8D8] hover:bg-white/5";
    case "primary":
    default:
      return "bg-[#E85002] text-white hover:bg-[#F16001] shadow-[0_18px_40px_rgba(232,80,2,0.22)]";
  }
}

function getSizeClasses(size: Size) {
  switch (size) {
    case "sm":
      return "px-4 py-2.5 text-sm";
    case "lg":
      return "px-6 py-4 text-base";
    case "md":
    default:
      return "px-5 py-3 text-sm md:text-base";
  }
}

function getBaseClasses(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex items-center justify-center rounded-full font-semibold transition duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E85002]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:cursor-not-allowed disabled:opacity-60",
    getVariantClasses(variant),
    getSizeClasses(size),
    className ?? ""
  ].join(" ");
}

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = props.className ?? "";

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={getBaseClasses(variant, size, className)}>
        {props.children}
      </Link>
    );
  }

  const { children, type = "button", ...buttonProps } = props as ButtonProps;

  return (
    <button
      type={type}
      className={getBaseClasses(variant, size, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}