import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Card } from "./Card";

export function EmptyState({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "border-dashed border-black/15 bg-white px-6 py-10 text-muted",
        className
      )}
      {...props}
    />
  );
}
