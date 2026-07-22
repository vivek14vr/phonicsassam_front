"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button, Container } from "@/components/ui";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/cities", label: "Cities & schools" },
  { href: "/admin/common-gallery", label: "Common Gallery" },
  { href: "/admin/galleries", label: "Location galleries" },
  { href: "/admin/workshops", label: "Workshops" },
];

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const { token, ready, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !token) router.replace("/admin/login");
  }, [ready, token, router]);

  if (!ready) {
    return (
      <Container className="py-16 text-center text-sm text-muted">
        Checking session…
      </Container>
    );
  }

  if (!token) return null;

  return (
    <Container className="space-y-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Sketchy Phonics
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted">{description}</p>
          ) : null}
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await logout();
            router.push("/admin/login");
          }}
        >
          Log out
        </Button>
      </div>

      <nav className="flex flex-wrap gap-2 border-b border-line pb-3">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                active
                  ? "bg-accent text-white"
                  : "bg-card text-ink hover:bg-white"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </Container>
  );
}
