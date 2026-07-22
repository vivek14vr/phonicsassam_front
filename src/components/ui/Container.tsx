import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "main" | "header" | "footer";
};

export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return <Component className={cn("section-shell", className)} {...props} />;
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: "default" | "white" | "soft" | "ink" | "accent";
};

const tones = {
  default: "bg-transparent",
  white: "bg-transparent",
  soft: "bg-transparent",
  ink: "bg-ink text-white",
  accent: "bg-accent text-white",
} as const;

export function Section({
  className,
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-12 sm:py-16", tones[tone], className)}
      {...props}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="text-muted">{description}</p> : null}
    </div>
  );
}
