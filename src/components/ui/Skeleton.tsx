import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse skeleton-shimmer rounded-xl bg-line/80",
        className
      )}
      {...props}
    />
  );
}

export function GalleryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <Skeleton className="aspect-[5/4] rounded-none" />
      <div className="space-y-3 border-t border-line p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <GalleryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProgramCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 max-w-xs" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    </div>
  );
}

export function ProgramGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProgramCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TeaserGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 rounded-2xl border border-line bg-card p-5"
        >
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-8 w-28" />
        </div>
      ))}
    </div>
  );
}

export function GalleryDetailSkeleton() {
  return (
    <div className="bg-background">
      <section className="border-b border-line py-6 sm:py-8">
        <div className="section-shell space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-4 w-56 max-w-full" />
        </div>
      </section>
      <section className="py-8 sm:py-10">
        <div className="section-shell space-y-8">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="aspect-video w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="aspect-[4/3] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AdminListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-line bg-card p-5">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-11 w-full" />
      ))}
    </div>
  );
}

export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="space-y-2 rounded-2xl border border-line bg-card p-5"
        >
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-12" />
        </div>
      ))}
    </div>
  );
}
