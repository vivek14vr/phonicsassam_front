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
      alt="PhonicWorld Learning Space"
      width={539}
      height={463}
      priority={priority}
      className={cn(
        "h-20 w-auto max-w-none bg-transparent object-contain object-left sm:h-24 md:h-28",
        className
      )}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center bg-transparent"
      aria-label="PhonicWorld Learning Space home"
    >
      {image}
    </Link>
  );
}
