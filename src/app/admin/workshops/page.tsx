"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import {
  AdminListSkeleton,
  Button,
  Card,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { api } from "@/lib/api";
import type { Program } from "@/lib/types";

const emptyForm = {
  badge: "",
  title: "",
  price: "",
  compareAtPrice: "",
  dateLabel: "",
  scheduleLabel: "",
  venue: "",
  ctaLabel: "Know More",
  ctaHref: "",
  description: "",
};

export default function AdminWorkshopsPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [cover, setCover] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  const programsQuery = useQuery({
    queryKey: ["admin", "programs"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ programs: Program[] }>("/programs", token),
  });

  const programs = programsQuery.data?.programs ?? [];

  const createProgram = useMutation({
    mutationFn: async () => {
      const body = new FormData();
      body.append("badge", form.badge);
      body.append("title", form.title);
      body.append("price", form.price);
      body.append("compareAtPrice", form.compareAtPrice);
      body.append("dateLabel", form.dateLabel);
      body.append("scheduleLabel", form.scheduleLabel);
      body.append("venue", form.venue);
      body.append("ctaLabel", form.ctaLabel || "Know More");
      body.append("ctaHref", form.ctaHref);
      body.append("description", form.description);
      body.append("isPublished", "true");
      if (cover) body.append("coverImage", cover);
      return api.post("/programs", body, token);
    },
    onSuccess: async () => {
      setForm(emptyForm);
      setCover(null);
      setFormError("");
      await queryClient.invalidateQueries({ queryKey: ["admin", "programs"] });
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const deleteProgram = useMutation({
    mutationFn: (id: string) => api.delete(`/programs/${id}`, undefined, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "programs"] });
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });

  function update<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <AdminShell
      title="Workshops"
      description="Manage workshop cards — badge, fee, date, venue, and CTA."
    >
      {formError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              createProgram.mutate();
            }}
            className="space-y-3"
          >
            <h2 className="text-lg font-bold text-ink">Add workshop</h2>
            <p className="text-xs text-muted">
              These appear on the public Workshops page.
            </p>

            <Label>
              <span>Badge</span>
              <Input
                placeholder="Online Workshop"
                value={form.badge}
                onChange={(e) => update("badge", e.target.value)}
              />
            </Label>
            <Label>
              <span>Title</span>
              <Input
                placeholder="6 Days Jolly Phonics Program"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </Label>
            <div className="grid gap-3 sm:grid-cols-2">
              <Label>
                <span>Price</span>
                <Input
                  placeholder="₹4999/-"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                />
              </Label>
              <Label>
                <span>Compare-at price</span>
                <Input
                  placeholder="₹6500"
                  value={form.compareAtPrice}
                  onChange={(e) => update("compareAtPrice", e.target.value)}
                />
              </Label>
            </div>
            <Label>
              <span>Date</span>
              <Input
                placeholder="24th Nov to 29th Nov 2025"
                value={form.dateLabel}
                onChange={(e) => update("dateLabel", e.target.value)}
              />
            </Label>
            <Label>
              <span>Time / batch</span>
              <Input
                placeholder="1 Batch · 11 AM Onwards"
                value={form.scheduleLabel}
                onChange={(e) => update("scheduleLabel", e.target.value)}
              />
            </Label>
            <Label>
              <span>Venue</span>
              <Input
                placeholder="Zoom Online"
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
              />
            </Label>
            <div className="grid gap-3 sm:grid-cols-2">
              <Label>
                <span>CTA label</span>
                <Input
                  placeholder="Know More"
                  value={form.ctaLabel}
                  onChange={(e) => update("ctaLabel", e.target.value)}
                />
              </Label>
              <Label>
                <span>CTA link</span>
                <Input
                  placeholder="https://..."
                  value={form.ctaHref}
                  onChange={(e) => update("ctaHref", e.target.value)}
                />
              </Label>
            </div>
            <Label>
              <span>Cover image</span>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCover(e.target.files?.[0] ?? null)}
              />
            </Label>
            <Label>
              <span>Notes (optional)</span>
              <Textarea
                placeholder="Internal notes / short description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </Label>
            <Button type="submit" variant="accent" disabled={createProgram.isPending}>
              {createProgram.isPending ? "Saving..." : "Add workshop"}
            </Button>
          </form>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">All workshops</h2>
          {programsQuery.isLoading ? (
            <AdminListSkeleton rows={3} />
          ) : programs.length === 0 ? (
            <p className="text-sm text-muted">No workshops yet.</p>
          ) : (
            <div className="space-y-3">
              {programs.map((program) => (
                <Card
                  key={program._id}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {program.coverImage?.url ? (
                      <Image
                        src={program.coverImage.url}
                        alt={program.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-soft text-xs text-muted">
                        N/A
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                        {program.badge || "Workshop"}
                      </p>
                      <p className="font-semibold text-ink">{program.title}</p>
                      <p className="text-sm text-muted">
                        {program.price || "No price"}
                        {program.venue ? ` · ${program.venue}` : ""}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteProgram.mutate(program._id)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
