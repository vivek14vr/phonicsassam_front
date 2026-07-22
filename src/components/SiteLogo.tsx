import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  href?: string;
  /** Use white-outline logo on dark surfaces (footer). */
  onDark?: boolean;
};

export function SiteLogo({
  className,
  priority = false,
  href = "/",
  onDark = false,
}: SiteLogoProps) {
  const image = (
    <Image
      src={onDark ? "/logo-on-dark.png" : "/logo.png"}
      alt="Sketchy Phonics"
      width={362}
      height={215}
      priority={priority}
      className={cn(
        "h-10 w-auto bg-transparent object-contain object-left sm:h-11",
        className
      )}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center bg-transparent"
      aria-label="Sketchy Phonics home"
    >
      {image}
    </Link>
  );
}
