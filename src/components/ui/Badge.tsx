import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  accent: "bg-accent text-white",
  soft: "bg-soft text-ink",
  ink: "bg-ink text-white",
  outline: "border border-ink/15 bg-white text-ink",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({
  className,
  variant = "accent",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
