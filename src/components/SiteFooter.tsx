import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { SiteLogo } from "@/components/SiteLogo";
import { IconBadge } from "@/components/PitchIcon";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white">
      <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <SiteLogo href="/" onDark className="h-24 sm:h-28 md:h-32" />
          <p className="max-w-sm text-sm leading-7 text-white/65">
            Past event galleries and teaching programs for government school
            teacher training.
          </p>
          <div className="flex flex-wrap gap-2">
            <IconBadge name="camera" size="sm" />
            <IconBadge name="play" size="sm" />
            <IconBadge name="teacher" size="sm" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Explore
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/about" className="hover:text-white">
              About Our Journey
            </Link>
            <Link href="/reading-success" className="hover:text-white">
              Reading Success
            </Link>
            <Link href="/galleries" className="hover:text-white">
              Galleries
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Galleries
          </p>
          <p className="text-sm text-white/65">
            Browse finished teaching events by state, city, school, and year.
          </p>
          <Button href="/galleries" variant="accent">
            Open Galleries
          </Button>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-xs text-white/60">
        <div className="section-shell flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Sketchy Phonics · Komal Goenka</p>
          <a
            href="https://www.roamingevents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-white/85 transition-colors hover:text-white sm:justify-end"
            aria-label="Designed and developed by Roaming Events — visit www.roamingevents.com"
          >
            <span>Designed and developed by Roaming Events</span>
            <span
              className="relative block h-5 w-[132px] shrink-0 overflow-hidden"
              role="img"
              aria-label="Roaming Events"
            >
              <Image
                src="/roaming-events-logo.png"
                alt=""
                width={4438}
                height={1274}
                aria-hidden="true"
                className="absolute max-w-none"
                unoptimized
                style={{ width: 304, height: "auto", left: -16, top: -32 }}
              />
            </span>
            <span className="font-medium text-accent underline decoration-accent/40 underline-offset-4">
              www.roamingevents.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
