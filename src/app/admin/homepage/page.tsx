"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import { DEFAULT_HERO_SHOWCASE, HeroShowcase } from "@/components/HeroShowcase";
import { MediaPicker } from "@/components/MediaPicker";
import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { api } from "@/lib/api";
import type {
  HeroShowcaseContent,
  HeroShowcaseImage,
  HeroShowcasePlace,
} from "@/lib/types";

type SettingsResponse = {
  settings: {
    id: string;
    heroShowcase: HeroShowcaseContent;
  };
};

function emptyPlace(): HeroShowcasePlace {
  return {
    name: "",
    count: "",
    galleryTitle: "",
    gallerySubtitle: "",
    photoCountLabel: "",
    images: [],
  };
}

function normalizePlace(place: HeroShowcasePlace): HeroShowcasePlace {
  return {
    name: place.name || "",
    count: place.count || "",
    galleryTitle: place.galleryTitle || "",
    gallerySubtitle: place.gallerySubtitle || "",
    photoCountLabel: place.photoCountLabel || "",
    images: (place.images || []).filter((img) => img.url).slice(0, 6),
  };
}

export default function AdminHomepagePage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<HeroShowcaseContent>(DEFAULT_HERO_SHOWCASE);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pickerPlaceIndex, setPickerPlaceIndex] = useState<number | null>(null);

  const settingsQuery = useQuery({
    queryKey: ["admin", "settings"],
    enabled: Boolean(token),
    queryFn: () => api.get<SettingsResponse>("/settings", token),
  });

  useEffect(() => {
    const data = settingsQuery.data?.settings.heroShowcase;
    if (!data) return;
    setForm({
      ...DEFAULT_HERO_SHOWCASE,
      ...data,
      places: (data.places?.length ? data.places : DEFAULT_HERO_SHOWCASE.places).map(
        normalizePlace
      ),
    });
  }, [settingsQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const body = new FormData();
      const fields: (keyof HeroShowcaseContent)[] = [
        "brandEyebrow",
        "title",
        "badgeLabel",
        "galleryTitle",
        "gallerySubtitle",
        "photoCountLabel",
        "browseEyebrow",
        "browseLabel",
        "browseCtaLabel",
        "browseCtaHref",
        "featuredEyebrow",
        "featuredTitle",
        "featuredDescription",
      ];
      for (const key of fields) {
        body.append(key, String(form[key] ?? ""));
      }
      body.append(
        "places",
        JSON.stringify(form.places.map(normalizePlace).filter((p) => p.name))
      );
      return api.put<SettingsResponse>("/settings", body, token);
    },
    onSuccess: (data) => {
      setForm({
        ...DEFAULT_HERO_SHOWCASE,
        ...data.settings.heroShowcase,
        places: (
          data.settings.heroShowcase.places?.length
            ? data.settings.heroShowcase.places
            : DEFAULT_HERO_SHOWCASE.places
        ).map(normalizePlace),
      });
      setMessage("Homepage showcase saved.");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      queryClient.invalidateQueries({ queryKey: ["settings", "public"] });
    },
    onError: (err) => {
      setMessage("");
      setError((err as Error).message);
    },
  });

  function updateField<K extends keyof HeroShowcaseContent>(
    key: K,
    value: HeroShowcaseContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePlace(index: number, patch: Partial<HeroShowcasePlace>) {
    setForm((prev) => ({
      ...prev,
      places: prev.places.map((place, i) =>
        i === index ? { ...place, ...patch } : place
      ),
    }));
  }

  function setPlaceImages(index: number, images: HeroShowcaseImage[]) {
    updatePlace(index, { images: images.slice(0, 6) });
  }

  function addPlace() {
    setForm((prev) => ({
      ...prev,
      places: [...prev.places, emptyPlace()],
    }));
  }

  function removePlace(index: number) {
    setForm((prev) => ({
      ...prev,
      places: prev.places.filter((_, i) => i !== index),
    }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");
    saveMutation.mutate();
  }

  const pickerPlace =
    pickerPlaceIndex !== null ? form.places[pickerPlaceIndex] : null;

  return (
    <AdminShell
      title="Homepage showcase"
      description="City chips are buttons — each city can have its own mosaic photos from the media library."
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <Card>
          <form onSubmit={onSubmit} className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Card header
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Label>
                  <span>Brand eyebrow</span>
                  <Input
                    value={form.brandEyebrow}
                    onChange={(e) => updateField("brandEyebrow", e.target.value)}
                    required
                  />
                </Label>
                <Label>
                  <span>Badge</span>
                  <Input
                    value={form.badgeLabel}
                    onChange={(e) => updateField("badgeLabel", e.target.value)}
                  />
                </Label>
              </div>
              <Label>
                <span>Title</span>
                <Input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </Label>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Default gallery labels
              </h2>
              <p className="text-xs text-muted">
                Used when a city chip has no override labels of its own.
              </p>
              <Label>
                <span>Gallery title</span>
                <Input
                  value={form.galleryTitle}
                  onChange={(e) => updateField("galleryTitle", e.target.value)}
                />
              </Label>
              <Label>
                <span>Gallery subtitle</span>
                <Input
                  value={form.gallerySubtitle}
                  onChange={(e) =>
                    updateField("gallerySubtitle", e.target.value)
                  }
                />
              </Label>
              <Label>
                <span>Photo count label</span>
                <Input
                  value={form.photoCountLabel}
                  onChange={(e) =>
                    updateField("photoCountLabel", e.target.value)
                  }
                />
              </Label>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    City buttons
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Visitors click a city to swap the mosaic images and labels.
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addPlace}>
                  Add city
                </Button>
              </div>

              <div className="space-y-4">
                {form.places.map((place, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-2xl border border-line bg-soft/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">
                        City {index + 1}
                        {place.name ? ` · ${place.name}` : ""}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePlace(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Label>
                        <span>Button name</span>
                        <Input
                          value={place.name}
                          onChange={(e) =>
                            updatePlace(index, { name: e.target.value })
                          }
                          placeholder="Assam"
                          required
                        />
                      </Label>
                      <Label>
                        <span>Count label</span>
                        <Input
                          value={place.count}
                          onChange={(e) =>
                            updatePlace(index, { count: e.target.value })
                          }
                          placeholder="48 events"
                        />
                      </Label>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Label>
                        <span>Gallery title (when selected)</span>
                        <Input
                          value={place.galleryTitle || ""}
                          onChange={(e) =>
                            updatePlace(index, { galleryTitle: e.target.value })
                          }
                          placeholder="Assam Workshop 2025"
                        />
                      </Label>
                      <Label>
                        <span>Photo count (when selected)</span>
                        <Input
                          value={place.photoCountLabel || ""}
                          onChange={(e) =>
                            updatePlace(index, {
                              photoCountLabel: e.target.value,
                            })
                          }
                          placeholder="142 photos"
                        />
                      </Label>
                    </div>
                    <Label>
                      <span>Gallery subtitle (when selected)</span>
                      <Input
                        value={place.gallerySubtitle || ""}
                        onChange={(e) =>
                          updatePlace(index, {
                            gallerySubtitle: e.target.value,
                          })
                        }
                        placeholder="Guwahati · Govt. Girls High School"
                      />
                    </Label>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                          Mosaic images ({place.images?.length || 0}/6)
                        </p>
                        <Button
                          type="button"
                          variant="accent"
                          size="sm"
                          onClick={() => setPickerPlaceIndex(index)}
                        >
                          Choose from gallery
                        </Button>
                      </div>

                      {(place.images?.length || 0) > 0 ? (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                          {place.images!.map((image) => (
                            <div
                              key={image.publicId || image.url}
                              className="relative aspect-square overflow-hidden rounded-lg border border-line"
                            >
                              <Image
                                src={image.url}
                                alt={image.alt || place.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                              <button
                                type="button"
                                className="absolute inset-x-1 bottom-1 rounded bg-ink/80 px-1 py-0.5 text-[10px] font-semibold text-white"
                                onClick={() =>
                                  setPlaceImages(
                                    index,
                                    (place.images || []).filter(
                                      (img) => img.publicId !== image.publicId
                                    )
                                  )
                                }
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted">
                          No images yet — pastel placeholders show until you
                          pick photos.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Browse bar
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Label>
                  <span>Eyebrow</span>
                  <Input
                    value={form.browseEyebrow}
                    onChange={(e) =>
                      updateField("browseEyebrow", e.target.value)
                    }
                  />
                </Label>
                <Label>
                  <span>CTA label</span>
                  <Input
                    value={form.browseCtaLabel}
                    onChange={(e) =>
                      updateField("browseCtaLabel", e.target.value)
                    }
                  />
                </Label>
              </div>
              <Label>
                <span>Browse label</span>
                <Input
                  value={form.browseLabel}
                  onChange={(e) => updateField("browseLabel", e.target.value)}
                />
              </Label>
              <Label>
                <span>CTA link</span>
                <Input
                  value={form.browseCtaHref}
                  onChange={(e) => updateField("browseCtaHref", e.target.value)}
                  placeholder="/galleries"
                />
              </Label>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Floating featured card
              </h2>
              <Label>
                <span>Eyebrow</span>
                <Input
                  value={form.featuredEyebrow}
                  onChange={(e) =>
                    updateField("featuredEyebrow", e.target.value)
                  }
                />
              </Label>
              <Label>
                <span>Title</span>
                <Input
                  value={form.featuredTitle}
                  onChange={(e) => updateField("featuredTitle", e.target.value)}
                />
              </Label>
              <Label>
                <span>Description</span>
                <Textarea
                  value={form.featuredDescription}
                  onChange={(e) =>
                    updateField("featuredDescription", e.target.value)
                  }
                  rows={3}
                />
              </Label>
            </section>

            {message ? (
              <p className="text-sm text-emerald-700">{message}</p>
            ) : null}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              variant="accent"
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Saving..." : "Save showcase"}
            </Button>
          </form>
        </Card>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Live preview (click city buttons)
          </p>
          <HeroShowcase content={form} />
        </div>
      </div>

      <MediaPicker
        open={pickerPlaceIndex !== null}
        title={
          pickerPlace?.name
            ? `Images for ${pickerPlace.name}`
            : "Choose city images"
        }
        maxSelect={6}
        selected={pickerPlace?.images || []}
        onClose={() => setPickerPlaceIndex(null)}
        onConfirm={(images) => {
          if (pickerPlaceIndex !== null) {
            setPlaceImages(pickerPlaceIndex, images);
          }
          setPickerPlaceIndex(null);
        }}
      />
    </AdminShell>
  );
}
