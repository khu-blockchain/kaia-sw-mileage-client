import { cn } from "@shared/lib/style";

export default function PageLayout({
	index,
	title,
	children,
	className,
}: {
	index: string;
	title: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<article
			className={cn("flex flex-col gap-6 w-full max-w-[1000px]", className)}
		>
			<header className="flex flex-col gap-2">
				<p className="text-sm text-index font-semibold">{index}</p>
				<p className="text-3xl font-semibold">{title}</p>
			</header>
			{children}
		</article>
	);
}
