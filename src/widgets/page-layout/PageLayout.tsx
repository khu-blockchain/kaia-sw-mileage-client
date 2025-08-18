import { cn } from "@shared/lib/style";

interface PageLayoutProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export default function PageLayout({
	title,
	children,
	className,
}: PageLayoutProps) {
	return (
		<article className={cn("flex flex-col gap-4", className)}>
			<header className="flex flex-col gap-2">
				<p className="text-2xl font-semibold">{title}</p>
			</header>
			{children}
		</article>
	);
}
