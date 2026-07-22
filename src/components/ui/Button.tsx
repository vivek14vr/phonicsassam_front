import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  ink: "bg-ink text-white hover:bg-black",
  accent: "bg-accent text-white hover:bg-accent-deep",
  outline: "border border-ink bg-white text-ink hover:bg-soft",
  ghost: "bg-transparent text-ink hover:bg-soft",
  soft: "bg-soft text-ink",
  danger: "border border-red-300 bg-white text-red-700 hover:bg-red-50",
  light: "border border-white/50 bg-transparent text-white hover:bg-white/10",
  white: "bg-white text-ink hover:bg-soft",
} as const;

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "ink",
      size = "md",
      fullWidth,
      className,
      children,
      href,
      type = "button",
      ...props
    },
    ref
  ) {
    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          onClick={
            props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
          }
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

export type { ButtonProps };
