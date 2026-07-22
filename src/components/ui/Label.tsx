import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block space-y-1 text-sm font-medium text-ink", className)}
      {...props}
    />
  );
}
