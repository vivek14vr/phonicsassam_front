"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import { Button, Card, CardDescription, CardTitle, StatCardsSkeleton } from "@/components/ui";
import { api } from "@/lib/api";
import type { City, GalleryEvent, School } from "@/lib/types";

const sections = [
  {
    href: "/admin/homepage",
    title: "Homepage showcase",
    detail: "Edit the hero gallery card texts, places, and mosaic photos.",
    step: "1",
  },
  {
    href: "/admin/cities",
    title: "Cities & schools",
    detail: "Add places first, then schools inside each city.",
    step: "2",
  },
  {
    href: "/admin/common-gallery",
    title: "Common Gallery",
    detail: "Upload shared photos for the homepage mosaic and Common Gallery tab.",
    step: "3",
  },
  {
    href: "/admin/galleries",
    title: "Location galleries",
    detail: "Create past-event galleries with photos, banner, and videos.",
    step: "4",
  },
];

export default function AdminOverviewPage() {
  const { token } = useAuth();

  const citiesQuery = useQuery({
    queryKey: ["admin", "cities"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ cities: City[] }>("/cities", token),
  });
  const schoolsQuery = useQuery({
    queryKey: ["admin", "schools"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ schools: School[] }>("/schools", token),
  });
  const eventsQuery = useQuery({
    queryKey: ["admin", "events"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ events: GalleryEvent[] }>("/events", token),
  });
  const countsLoading =
    citiesQuery.isLoading ||
    schoolsQuery.isLoading ||
    eventsQuery.isLoading;

  const counts = [
    { label: "Cities", value: citiesQuery.data?.cities.length ?? 0 },
    { label: "Schools", value: schoolsQuery.data?.schools.length ?? 0 },
    { label: "Location galleries", value: eventsQuery.data?.events.length ?? 0 },
  ];

  return (
    <AdminShell
      title="Admin overview"
      description="Pick a section to manage. Start with the homepage showcase, then city → school → gallery."
    >
      {countsLoading ? (
        <StatCardsSkeleton />
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          {counts.map((item) => (
            <Card key={item.label} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {item.label}
              </p>
              <p className="font-display text-3xl font-semibold text-ink">
                {item.value}
              </p>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.href} className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Step {section.step}
            </p>
            <CardTitle className="mt-2">{section.title}</CardTitle>
            <CardDescription className="mt-2 flex-1">
              {section.detail}
            </CardDescription>
            <div className="mt-5">
              <Button href={section.href} variant="accent" size="sm">
                Open {section.title}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Need the public site? Preview galleries anytime.
        </p>
        <Button href="/galleries" variant="outline" size="sm">
          View public galleries
        </Button>
      </Card>

      <p className="text-xs text-muted">
        Tip: start with{" "}
        <Link href="/admin/cities" className="font-semibold text-accent">
          Cities & schools
        </Link>
        , then create a gallery.
      </p>
    </AdminShell>
  );
}
