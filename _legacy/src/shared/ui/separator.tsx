import { cn } from "@/shared/utils"

function Separator({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-[1px] bg-border", className)} />
  )
}

export { Separator }
