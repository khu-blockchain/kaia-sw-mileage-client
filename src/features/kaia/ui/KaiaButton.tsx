import { KaiaIcon } from "@/shared/assets";
import { cn } from "@/shared/lib/style";

const DefaultButton = ({
	className,
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex justify-center items-center gap-2 min-w-56 h-10 rounded-md text-sm text-white font-semibold bg-black",
				className,
			)}
		>
			<img src={KaiaIcon} alt="logo" className="w-4" />
			<span>Connect to Kaia Wallet</span>
		</button>
	);
};

const SmallButton = ({
	className,
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex justify-center items-center p-2 w-min h-8 rounded-full bg-transparent border border-kaia text-xs text-kaia font-semibold whitespace-nowrap",
				className,
			)}
		>
			<span>Connect Wallet</span>
		</button>
	);
};

const KaiaButton = {
	DefaultButton: DefaultButton,
	SmallButton: SmallButton,
};

export default KaiaButton;
