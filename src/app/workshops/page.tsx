"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ResourcesYouWillGet,
  WhatYouWillLearn,
  WhoWorkshopIsForDetailed,
} from "@/components/WorkshopPitchSections";
import { WorkshopCard } from "@/components/WorkshopCard";
import { PhotoCollage, StoryBand } from "@/components/SceneVisuals";
import { AnimatedChipRow, PageHeroCopy } from "@/components/PageMotion";
import {
  Button,
  Container,
  EmptyState,
  ProgramGridSkeleton,
  Section,
} from "@/components/ui";
import { api } from "@/lib/api";
import type { Program } from "@/lib/types";

const workshopHighlights = [
  { label: "Live batches", icon: "play" as const },
  { label: "Teaching kits", icon: "cards" as const },
  { label: "Certificate", icon: "cert" as const },
];

export default function WorkshopsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["workshops", "public"],
    queryFn: () => api.get<{ programs: Program[] }>("/programs/public"),
  });

  const workshops = data?.programs ?? [];

  return (
    <div className="bg-background">
      <Section className="border-b border-line py-6 sm:py-8">
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <PageHeroCopy
            eyebrow="Workshops"
            title="Explore Ongoing Workshops"
            detail="Online and in-person workshop batches with dates, venues, and fees — built for teachers who want classroom-ready phonics."
          >
            <AnimatedChipRow items={workshopHighlights} />
          </PageHeroCopy>
          <PhotoCollage images={["classroom", "kidsPlay", "kidsRead"]} />
        </Container>
      </Section>

      <WhoWorkshopIsForDetailed />
      <WhatYouWillLearn />

      <StoryBand
        image="kidsLearning"
        eyebrow="Practice that sticks"
        title="Teachers leave with games children actually enjoy"
        detail="Every workshop includes sketchnote methods, sound games, and ready-to-use materials so the next school day feels lighter — and louder with happy readers."
        align="right"
        tone="soft"
      />

      <ResourcesYouWillGet />

      <Section>
        <Container id="workshop-list" className="scroll-mt-24 space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Current batches
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Choose a workshop
            </h2>
          </div>

          {isLoading ? (
            <ProgramGridSkeleton />
          ) : error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {(error as Error).message}
            </p>
          ) : workshops.length === 0 ? (
            <EmptyState>
              No workshops listed yet. Add workshops from Admin.
            </EmptyState>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop, i) => (
                <WorkshopCard
                  key={workshop._id}
                  workshop={workshop}
                  index={i}
                />
              ))}
            </div>
          )}

          <Button href="/galleries" variant="outline">
            See past events in Galleries
          </Button>
        </Container>
      </Section>
    </div>
  );
}
