import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="w-[70%] mx-auto flex flex-col space-y-3">
      <Skeleton className="h-full lg:h-[16.7rem] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[4rem] w-1/2" />
        <Skeleton className="h-[2rem] w-[200px]" />
        <Skeleton className="h-[4rem] w-2/3" />
        <Skeleton className="h-[2rem] w-[200px]" />
      </div>
    </div>
  )
}
