export default function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-raised" aria-hidden="true">
      <div className="aspect-[16/9] animate-pulse bg-white/[0.035]" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-1/2 animate-pulse rounded bg-white/[0.05]" />
        <div className="h-3 w-full animate-pulse rounded bg-white/[0.035]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.035]" />
        <div className="flex gap-2 pt-3">
          <div className="h-5 w-16 animate-pulse rounded bg-white/[0.04]" />
          <div className="h-5 w-20 animate-pulse rounded bg-white/[0.04]" />
          <div className="h-5 w-14 animate-pulse rounded bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}
