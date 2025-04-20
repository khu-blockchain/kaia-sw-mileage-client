import { useConnect } from "@/shared/hooks";
import { ConnectButton } from "@/shared/component";
import { useLocation, useNavigate } from "react-router";
import KaiaLogo from "@/shared/assets/images/icon_kaia_dark.svg";
import { cn, sliceWalletAddress } from "@/shared/utils";
import { Bolt } from "lucide-react";
import { useGetMileagePoint } from "@/features/token";
import { MENU, provider } from "@/shared/constants";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletAddress } = useConnect();

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 flex items-center px-8 bg-white border-b border-slate-20">
      <div className="flex w-7xl max-w-7xl mx-auto justify-between items-center gap-8">
        <div className="flex gap-10 items-center ">
          <img
            src="https://swedu.khu.ac.kr/images/logo_swedu.png"
            alt="logo"
            onClick={() => navigate("/")}
            className="h-8 object-contain cursor-pointer"
          />
          <div className="flex gap-4">
            {MENU.map((menu) => (
              <p
                key={menu.path}
                className={cn(
                  "text-body text-sm font-semibold cursor-pointer",
                  location.pathname === menu.path && "text-index"
                )}
                onClick={() => navigate(menu.path)}
              >
                {menu.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <MyPoint />
          {walletAddress === "" ? (
            <ConnectButton.SmallButton />
          ) : (
            <div className="flex flex-row items-center h-8 gap-1 border border-kaia rounded-full py-1 pl-1 pr-2">
              <img src={KaiaLogo} alt="logo" className="w-6" />
              <span className="text-xs text-kaia font-bold">
                {sliceWalletAddress(walletAddress)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const MyPoint = () => {
  const { data } = useGetMileagePoint({
    targetAddress: provider.selectedAddress,
  });
  //TODO: call 요청 처리되는것까지는 확인,
  //hex랑 wei 처리해야되는지 몰라서 실제 값 렌더링은 마일리지 지급까지 확인 한 후 작업

  return (
    <div className="flex gap-1 items-center">
      <Bolt className="w-5 h-5 text-body" />
      <p className="text-body text-sm font-semibold">{`${data}점`}</p>
    </div>
  );
};

export default Header;
