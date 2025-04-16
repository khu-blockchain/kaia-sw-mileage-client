import KaiaLogo from "@/shared/assets/images/icon_kaia_dark.svg";
import { cn } from "@/shared/utils";
import { useConnect } from "@/shared/hooks";

const DefaultButton = ({ className, connectCallback }: { className?: string, connectCallback?: (address: string[]) => void }) => {
  const {onConnect} = useConnect();
    return (
    <button
      type="button"
      onClick={() => onConnect(connectCallback)}
      className={cn(
        "flex justify-center items-center gap-2 min-w-56 h-10 rounded-md text-sm text-white font-semibold bg-black",
        className
      )}
    >
      <img src={KaiaLogo} alt="logo" className="w-4" />
      <span>Connect to Kaia Wallet</span>
    </button>
  );
}

const SmallButton = ({className, connectCallback}: {className?: string, connectCallback?: (address: string[]) => void}) => {
  const {onConnect} = useConnect();
  return (
    <button
      type="button"
      onClick={() => onConnect(connectCallback)}
      className={cn(
        "flex justify-center items-center p-2 w-min h-8 rounded-full bg-transparent border border-kaia text-xs text-kaia font-semibold whitespace-nowrap",
        className
      )}
    >
      <span>Connect Wallet</span>
    </button>
  );
}

const ConnectButton = {
  DefaultButton: DefaultButton,
  SmallButton: SmallButton,
};

export default ConnectButton;
