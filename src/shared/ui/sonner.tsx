import type { CSSProperties } from "react";
import type { ToasterProps } from "sonner";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme={"light" as ToasterProps["theme"]}
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
