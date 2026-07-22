"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
  AdminListSkeleton,
} from "@/components/ui";
import { api } from "@/lib/api";
import type { City, School } from "@/lib/types";

export default function AdminCitiesPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityState, setCityState] = useState("");
  const [cityDescription, setCityDescription] = useState("");
  const [cityCover, setCityCover] = useState<File | null>(null);
  const [schoolName, setSchoolName] = useState("");
  const [schoolDescription, setSchoolDescription] = useState("");
  const [formError, setFormError] = useState("");

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

  const cities = citiesQuery.data?.cities ?? [];
  const schools = schoolsQuery.data?.schools ?? [];
  const activeCityId = selectedCityId || cities[0]?._id || "";

  useEffect(() => {
    if (!selectedCityId && cities[0]?._id) {
      setSelectedCityId(cities[0]._id);
    }
  }, [cities, selectedCityId]);

  const citySchools = useMemo(
    () =>
      schools.filter((school) => {
        const cityId =
          typeof school.city === "object" ? school.city._id : school.city;
        return cityId === activeCityId;
      }),
    [schools, activeCityId]
  );

  const activeCity = cities.find((city) => city._id === activeCityId);

  const createCity = useMutation({
    mutationFn: async () => {
      const form = new FormData();
      form.append("name", cityName);
      form.append("state", cityState);
      form.append("description", cityDescription);
      form.append("isPublished", "true");
      if (cityCover) form.append("coverImage", cityCover);
      return api.post<{ city: City }>("/cities", form, token);
    },
    onSuccess: async (data) => {
      setCityName("");
      setCityState("");
      setCityDescription("");
      setCityCover(null);
      setFormError("");
      setSelectedCityId(data.city._id);
      await queryClient.invalidateQueries({ queryKey: ["admin", "cities"] });
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const createSchool = useMutation({
    mutationFn: async () => {
      if (!activeCityId) throw new Error("Add a city first");
      return api.post(
        "/schools",
        {
          cityId: activeCityId,
          name: schoolName,
          description: schoolDescription,
          isPublished: true,
        },
        token
      );
    },
    onSuccess: async () => {
      setSchoolName("");
      setSchoolDescription("");
      setFormError("");
      await queryClient.invalidateQueries({ queryKey: ["admin", "schools"] });
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const deleteCity = useMutation({
    mutationFn: (id: string) => api.delete(`/cities/${id}`, undefined, token),
    onSuccess: async () => {
      setSelectedCityId("");
      await queryClient.invalidateQueries({ queryKey: ["admin", "cities"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "schools"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const deleteSchool = useMutation({
    mutationFn: (id: string) => api.delete(`/schools/${id}`, undefined, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "schools"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <AdminShell
      title="Cities & schools"
      description="Step 1 — add a city with details, then add schools inside it."
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
              createCity.mutate();
            }}
            className="space-y-3"
          >
            <h2 className="text-lg font-bold text-ink">Add city</h2>
            <p className="text-xs text-muted">
              e.g. Munger in Bihar. Then add schools inside it.
            </p>
            <Input
              placeholder="City name (e.g. Munger)"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
            <Input
              placeholder="State (e.g. Bihar, Assam)"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              required
            />
            <Textarea
              placeholder="Short details about this city / place"
              value={cityDescription}
              onChange={(e) => setCityDescription(e.target.value)}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setCityCover(e.target.files?.[0] ?? null)}
            />
            <Button type="submit" disabled={createCity.isPending}>
              {createCity.isPending ? "Saving..." : "Add city"}
            </Button>
          </form>
        </Card>

        <Card>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              createSchool.mutate();
            }}
            className="space-y-3"
          >
            <h2 className="text-lg font-bold text-ink">Add school</h2>
            <p className="text-xs text-muted">
              Schools belong to a city. Select the city, then add a school.
            </p>
            <Select
              value={activeCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              required
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}, {city.state}
                </option>
              ))}
            </Select>
            <Input
              placeholder="School name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
              disabled={!activeCityId}
            />
            <Textarea
              placeholder="Optional school note"
              value={schoolDescription}
              onChange={(e) => setSchoolDescription(e.target.value)}
              disabled={!activeCityId}
            />
            <Button
              type="submit"
              disabled={createSchool.isPending || !activeCityId}
            >
              {createSchool.isPending ? "Saving..." : "Add school"}
            </Button>
          </form>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink">Manage cities</h2>
            <p className="text-sm text-muted">
              Select a city to see its schools.
            </p>
          </div>
          {cities.length > 0 ? (
            <Select
              value={activeCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="max-w-xs"
            >
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}, {city.state}
                </option>
              ))}
            </Select>
          ) : null}
        </div>

        {citiesQuery.isLoading ? (
          <AdminListSkeleton rows={2} />
        ) : cities.length === 0 ? (
          <p className="text-sm text-muted">No cities yet.</p>
        ) : activeCity ? (
          <Card className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {activeCity.coverImage?.url ? (
                  <Image
                    src={activeCity.coverImage.url}
                    alt={activeCity.name}
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
                  <p className="font-semibold text-ink">{activeCity.name}</p>
                  <p className="text-sm text-muted">{activeCity.state}</p>
                  {activeCity.description ? (
                    <p className="mt-1 max-w-xl text-sm text-muted">
                      {activeCity.description}
                    </p>
                  ) : null}
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if (
                    confirm(
                      `Delete ${activeCity.name} and all its schools/events?`
                    )
                  ) {
                    deleteCity.mutate(activeCity._id);
                  }
                }}
              >
                Delete city
              </Button>
            </div>

            <div className="space-y-2 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">
                Schools in {activeCity.name}
              </p>
              {citySchools.length === 0 ? (
                <p className="text-sm text-muted">
                  No schools in this city yet.
                </p>
              ) : (
                citySchools.map((school) => (
                  <div
                    key={school._id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-ink">{school.name}</p>
                      {school.description ? (
                        <p className="text-sm text-muted">
                          {school.description}
                        </p>
                      ) : null}
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm(`Delete ${school.name} and its past events?`)
                        ) {
                          deleteSchool.mutate(school._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>
        ) : null}
      </section>
    </AdminShell>
  );
}
