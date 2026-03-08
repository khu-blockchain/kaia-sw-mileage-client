import { cn } from "@shared/lib/style";

interface ErrorMessageProps {
	errors: any;
	fields: Array<{
		field: string;
		label: string;
	}>;
	className?: string;
}

function ErrorMessage({ errors, fields, className }: ErrorMessageProps) {
	return (
		<ul className={cn("list-disc", className)}>
			{fields.map(
				(field) =>
					errors[field.field]?.message && (
						<li
							key={field.field}
							className="text-xs text-destructive whitespace-pre-wrap"
						>
							{field.label}: {errors[field.field]?.message}
						</li>
					),
			)}
		</ul>
	);
}

export { ErrorMessage };
