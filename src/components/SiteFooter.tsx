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
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Sketchy Phonics · Komal Goenka
      </div>
    </footer>
  );
}
