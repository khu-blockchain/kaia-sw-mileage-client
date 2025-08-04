import { cn } from "@/shared/lib/style";

function Separator({ className }: { className?: string }) {
	return <div className={cn("w-full h-[1px] bg-border", className)} />;
}

export { Separator };
